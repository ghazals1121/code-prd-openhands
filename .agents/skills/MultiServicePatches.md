# Multi-Service Architecture Support — Agent Patches

## Overview

This document describes two levels of changes to support multi-service/polyglot projects:

- **Option 1 (Full)**: Stage 0 agent + structural changes to all downstream agents
- **Option 2 (Minimal)**: Lightweight patches to existing agents without a new Stage 0

---

# OPTION 1 — Full Multi-Service Support

## How the Pipeline Changes

### Before (single-service)
```
Codebase → Stage 1 → Stage 2 → Stage 3 → Stage 4 → Stage 5
```

### After (multi-service aware)
```
Codebase → Stage 0 (Service Discovery)
               ↓
         For each service:
               Stage 1 (per-service) → Stage 2 (per-service)
               ↓
         Cross-service merge:
               Stage 3 (unified) → Stage 4 (unified) → Stage 5 (unified)
```

Stage 0 runs once. Stage 1 and Stage 2 run once **per service**. Stages 3, 4, and 5 run once on the **merged** outputs with full cross-service context.

---

## Stage 1 — Codebase Framework Detection Agent

### Changes Required

**1. Accept Stage 0 output as input**

Add to Step 1:

```
You will receive:
- A service entry from the Stage 0 Service Discovery Agent output, containing:
  - service_name: the name of the service you are analyzing
  - root_path: the directory to scan
  - framework_signals: preliminary hints (do NOT rely on these — do your own detection)
- Optionally, the full Stage 0 output for context about other services

Use the root_path as the target for your `find` command. All file paths in your output
must be relative to this service's root_path, NOT the project root.
```

**2. Add service_name to the output**

Wrap the entire output in a service context:

```json
{
  "service_name": "<from Stage 0>",
  "service_root": "<root_path from Stage 0>",
  "project_name": "<inferred or from Stage 0>",
  "detected_stack": { ... },
  "file_classification": { ... },
  "summary": { ... }
}
```

**3. Add cross-service references to file classification**

Add a new optional field to any classified file that references another service:

```json
{
  "file_path": "clients/doctor_api.py",
  "description": "HTTP client for the Doctor service API",
  "cross_service_reference": {
    "target_service": "doctor-service",
    "protocol": "http",
    "evidence": "imports requests, calls DOCTOR_SERVICE_URL"
  }
}
```

**4. New classification category (optional)**

Add a 5th category: `service_clients` — files whose primary purpose is communicating with other services (HTTP clients, gRPC stubs, message queue publishers/consumers).

If not adding a 5th category, classify these files under `business_logic` but tag them with `cross_service_reference`.

---

## Stage 2 — Frontend UX & Business Logic Analysis Agent

### Changes Required

**1. Accept per-service Stage 1 output + Stage 0 manifest**

```
You will receive:
- The Stage 1 JSON for the service you are analyzing
- The Stage 0 service manifest (for cross-service context)
- Optionally, Stage 1 JSONs from other services (for resolving cross-service calls)
```

**2. Update request handling to trace cross-service calls**

When tracing a request in Step 3c, if the handler calls an HTTP client that targets another service:

- Record it as a `cross_service_call` instead of stopping at "external API"
- If Stage 1 output for the target service is available, reference the specific endpoint being called
- Describe what data is sent and what response shape is expected

Add to the request_handling schema:

```json
{
  "triggered_by": "...",
  "handler_file": "...",
  "processing_steps": "...",
  "business_logic_invoked": "...",
  "cross_service_calls": [
    {
      "target_service": "<service name from Stage 0>",
      "protocol": "http",
      "method": "GET",
      "endpoint": "/api/doctors/",
      "data_sent": "<description of request payload>",
      "expected_response": "<description of response shape>",
      "handler_in_target": "<file:function in target service if known, else null>"
    }
  ],
  "outcome": "..."
}
```

**3. Tag pages and features with service_name**

Every page entry should include which service it belongs to:

```json
{
  "page_name": "Doctor Search Page",
  "service_name": "frontend-app",
  "route": "/search",
  ...
}
```

**4. Update all_features with service scope**

Each feature in `all_features` should indicate which service(s) implement it:

```json
{
  "id": "F-001",
  "name": "Search doctors by specialty",
  "services_involved": ["frontend-app", "doctor-service"],
  ...
}
```

---

## Stage 3 — User Story & Data Flow Analysis Agent

### Changes Required (most significant)

**1. Accept merged inputs from all services**

```
You will receive:
- The Stage 0 service manifest
- Stage 1 JSON for EACH service (array)
- Stage 2 JSON for EACH service (array)
- Read access to all files across all services
```

**2. Unified working set spans all services**

Build the working set by combining files from ALL services' Stage 1 outputs. Prefix file paths with the service name or root_path to avoid collisions:

```
booking-service/services/booking_service.py
doctor-service/app/services/doctor_service.rb
```

**3. Cross-service data flow tracing**

This is the core change. When tracing a data flow that crosses service boundaries:

a. **Identify the boundary crossing**: The handler in Service A makes an HTTP/gRPC/queue call to Service B.

b. **Continue the trace into Service B**: Find the corresponding endpoint handler in Service B's Stage 1 file classification. Read Service B's handler to trace what models it queries and what business logic it applies.

c. **Record the full chain**: The data flow entry should show the complete path:
   - Service A: handler → service call → HTTP client → (network boundary)
   - Service B: API handler → service call → ORM query → response
   - Service A: receives response → continues processing

Add to the data flow schema:

```json
{
  "page": "...",
  "interaction": "...",
  "input_data": { ... },
  "cross_service_flows": [
    {
      "sequence": 1,
      "from_service": "frontend-app",
      "to_service": "doctor-service",
      "protocol": "http",
      "request": {
        "method": "GET",
        "endpoint": "/api/doctors/?specialty=cardiology&location=NYC",
        "handler_in_target": "doctor-service/app/controllers/doctors_controller.rb:index"
      },
      "processing_in_target": {
        "orm_queries": [
          {
            "model": "Doctor (in doctor-service)",
            "operation": "filter",
            "description": "Doctor.where(specialty: params[:specialty], city: params[:location])"
          }
        ],
        "business_logic_invoked": "doctor-service/app/services/search_service.rb:SearchService.find_doctors"
      },
      "response": {
        "shape": "Array of {id, name, specialty, city, rating, available_slots}",
        "http_status": "200"
      }
    }
  ],
  "output_data": { ... },
  "apis_called": { ... },
  "business_rules_applied": [ ... ]
}
```

**4. User stories reference service context**

Each user story should note which services are involved:

```json
{
  "id": "US-005",
  "services_involved": ["frontend-app", "doctor-service"],
  ...
}
```

---

## Stage 4 — User Flow Compilation Agent

### Changes Required

**1. Accept merged Stage 2 and Stage 3 outputs**

The agent now receives outputs that span multiple services.

**2. Flows annotate service boundaries**

When a flow step crosses a service boundary, annotate it:

```
7. User clicks 'Search'.
8. [frontend-app] Frontend sends GET /api/doctors/?specialty=cardiology to doctor-service.
9. [doctor-service] System queries Doctor model filtered by specialty and location, sorted by rating.
10. [doctor-service] System returns JSON array of matching doctors.
11. [frontend-app] App displays search results as doctor cards.
```

**3. Add cross_service_hops to each flow**

```json
{
  "title": "Patient Searches for a Doctor",
  "cross_service_hops": [
    {
      "step_number": 8,
      "from_service": "frontend-app",
      "to_service": "doctor-service",
      "protocol": "http"
    }
  ],
  ...
}
```

---

## Stage 5 — API Data Model Mapping Agent

### Changes Required (most significant alongside Stage 3)

**1. Models are scoped to services**

Every model entry must include its service:

```json
{
  "model_name": "Doctor",
  "service_name": "doctor-service",
  "file_path": "doctor-service/app/models/doctor.rb",
  ...
}
```

**2. New relationship type: cross-service logical reference**

When Service A stores a `doctor_id` integer that references Service B's `Doctor.id`, this is NOT a database ForeignKey — it's a **cross-service logical reference**. Add a new relationship type:

```json
{
  "from_model": "Booking (in booking-service)",
  "from_field": "doctor_id",
  "to_model": "Doctor (in doctor-service)",
  "relationship_type": "cross_service_reference",
  "on_delete": "application_managed",
  "protocol": "http",
  "resolution_endpoint": "GET /api/doctors/<id>/",
  "cardinality": "many Bookings → one Doctor (resolved via API, not FK)",
  "description": "Booking stores a doctor_id integer. The actual Doctor record lives in doctor-service and is resolved via HTTP API call. There is no database-level foreign key constraint."
}
```

**3. API-to-model mapping crosses services**

When an API in Service A triggers a call to Service B, and Service B queries its own models, record the full chain:

```json
{
  "api_endpoint": {
    "method": "POST",
    "url_pattern": "/api/bookings/create/",
    "handler_file": "booking-service/api/views.py",
    "service_name": "booking-service"
  },
  "models_accessed": [
    {
      "model": "Booking",
      "service": "booking-service",
      "operation": "write",
      "access_path": "direct"
    },
    {
      "model": "Doctor",
      "service": "doctor-service",
      "operation": "read",
      "access_path": "cross_service_http",
      "description": "Booking handler calls GET doctor-service/api/doctors/<id>/ to validate doctor exists before creating booking",
      "resolved_via": "GET /api/doctors/<id>/"
    }
  ]
}
```

**4. Shared database detection**

If Stage 0 flagged a shared database, and two services define models in the same database:

```json
{
  "shared_databases": [
    {
      "database_name": "main_db",
      "services": ["booking-service", "doctor-service"],
      "shared_tables": ["doctors", "locations"],
      "owned_by": "doctor-service",
      "accessed_by": ["booking-service (read-only via direct SQL/ORM)"],
      "note": "booking-service reads doctor-service tables directly instead of via API — tight coupling risk"
    }
  ]
}
```

---

---

# OPTION 2 — Minimal Patches (no Stage 0)

These patches keep the existing agents largely intact but add enough multi-service awareness to avoid broken output.

---

## Stage 1 — Minimal Patch

**Change 1: Support array of stacks**

Replace singular `detected_stack` fields with arrays:

```json
"detected_stack": {
  "languages": ["Python", "Ruby", "JavaScript"],
  "backend_frameworks": [
    {"framework": "Django 5.1.3", "root_path": "services/booking-api"},
    {"framework": "Ruby on Rails 7.1", "root_path": "services/doctor-api"}
  ],
  "frontend_framework": "React 18.2",
  "database_orms": [
    {"orm": "Django ORM", "root_path": "services/booking-api"},
    {"orm": "ActiveRecord", "root_path": "services/doctor-api"}
  ],
  "architecture_pattern": "Microservices",
  "package_managers": ["pip", "bundler", "npm"]
}
```

**Change 2: Add service tag to every classified file**

```json
{
  "file_path": "services/booking-api/bookings/models.py",
  "description": "Booking model with guest, room, dates, and status",
  "service": "booking-api"
}
```

**Change 3: Add a cross_service_references section to summary**

```json
"summary": {
  ...
  "cross_service_references": [
    {
      "file": "services/booking-api/clients/doctor_client.py",
      "target_service": "doctor-api",
      "protocol": "http",
      "evidence": "imports requests, calls http://doctor-api:3000/api/doctors"
    }
  ]
}
```

---

## Stage 2 — Minimal Patch

**Change 1: Tag pages with service**

Add `"service": "<service-name>"` to each page entry.

**Change 2: Note cross-service calls as external with service hint**

In request_handling, when a handler calls another service:

```json
{
  "business_logic_invoked": null,
  "external_service_call": {
    "target_service": "doctor-api",
    "endpoint": "GET /api/doctors/",
    "note": "Full tracing into this service is not available — would require Stage 0 multi-service pipeline"
  }
}
```

---

## Stage 3 — Minimal Patch

**Change 1: Record cross-service calls explicitly instead of as opaque external APIs**

Replace the `external_apis` entries with a more descriptive format:

```json
"external_apis": [
  {
    "service": "doctor-api (internal microservice, not third-party)",
    "method_or_endpoint": "GET /api/doctors/?specialty=cardiology",
    "data_sent": "query params: specialty, location",
    "data_received": "JSON array of doctor objects (shape unknown — defined in doctor-api service)",
    "tracing_gap": "Cannot trace into doctor-api models or business logic from this service's codebase alone"
  }
]
```

**Change 2: Add a tracing_gaps section to summary**

```json
"summary": {
  ...
  "tracing_gaps": [
    {
      "interaction": "User searches for a doctor",
      "gap": "Search request is forwarded to doctor-api service. Models queried, business rules applied, and response shape in doctor-api are not traced because this agent only has access to the booking-api codebase.",
      "would_require": "Multi-service Stage 0 pipeline with access to doctor-api source files"
    }
  ]
}
```

---

## Stage 4 — Minimal Patch

**Change 1: Note service boundaries in flow steps**

```
8. Frontend sends search request to doctor-api service (cross-service boundary — details of doctor-api processing not traced).
```

**Change 2: Add untraceable_steps to each flow**

```json
{
  "title": "Patient Searches for a Doctor",
  "untraceable_steps": [
    {
      "step_number": 8,
      "reason": "Crosses into doctor-api service which is not analyzed by this pipeline run"
    }
  ]
}
```

---

## Stage 5 (API Data Model Mapping) — Minimal Patch

**Change 1: Tag models with service**

```json
{
  "model_name": "Booking",
  "service": "booking-api",
  ...
}
```

**Change 2: Record cross-service integer references**

When a model has an integer field that appears to reference another service's model (heuristic: field named `*_id` with no corresponding ForeignKey in the same codebase):

```json
{
  "field_name": "doctor_id",
  "field_type": "IntegerField",
  "is_relationship": false,
  "suspected_cross_service_reference": {
    "likely_target_service": "doctor-api",
    "likely_target_model": "Doctor",
    "confidence": "medium",
    "evidence": "Field is named doctor_id but no Doctor model exists in this service. Stage 0 detected a doctor-api service."
  }
}
```

**Change 3: Add cross_service_model_gaps to summary**

```json
"summary": {
  ...
  "cross_service_model_gaps": [
    {
      "model": "Booking.doctor_id",
      "service": "booking-api",
      "gap": "doctor_id is an integer field with no ForeignKey. The Doctor model likely exists in doctor-api but its schema is not available in this pipeline run."
    }
  ]
}
```

---

# Comparison Summary

| Aspect | Option 1 (Full) | Option 2 (Minimal) |
|-|-|-|
| New agents | Stage 0 (Service Discovery) | None |
| Pipeline runs | Stage 1-2 per service, Stage 3-5 unified | All stages run once on entire repo |
| Cross-service tracing | Full — traces into target service's models and logic | Stops at boundary, documents gaps |
| Cross-service model relationships | Explicit `cross_service_reference` type | Heuristic `suspected_cross_service_reference` |
| Shared database detection | Yes (Stage 0) | No |
| Communication graph | Yes (Stage 0) | Partial (noted in summary) |
| Effort to implement | High — all agents modified + new agent | Low — additive patches only |
| Output quality for multi-service | Complete | Incomplete but honest about gaps |
| Backward compatible for single-service | Yes (Stage 0 emits single-service manifest) | Yes (new fields are optional/empty) |
