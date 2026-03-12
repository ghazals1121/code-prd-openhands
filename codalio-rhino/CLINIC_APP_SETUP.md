# Clinic Appointment Request App – Setup

## Run the database migration

From the project root (with Ruby and Bundler available):

```bash
bundle exec rails db:migrate
```

This creates the `appointment_requests` table.

## Already done

- **Route tree** – Appointment routes are in `app/frontend/routeTree.gen.ts` (`/$owner/appointment`, `/$owner/appointment/form`, `/$owner/appointment/confirmation`).
- **API types** – `appointment_request` schema and paths are in `app/frontend/models/models.d.ts`.

## Optional: Regenerate OpenAPI types later

With the Rails server running:

```bash
npx openapi-typescript http://localhost:3000/api/info/openapi -o app/frontend/models/models.d.ts
```

This will refresh the types from the live API (e.g. after adding more resources).
