---
name: rhino-setup
description: Initialize new Rhino features or components. Use when setting up new models, migrations, frontend pages, or other Rhino components from scratch. ALWAYS set up multi-tenancy with organizations first for new projects.
---

# Rhino Setup

Complete setup workflows for common Rhino tasks including models, migrations, frontend pages, and component initialization.

## When to Use

- Setting up a new Rhino project from scratch
- Initial project setup with multi-tenancy
- Setting up a new feature from scratch
- Initializing new models and their related components
- Creating new frontend pages and routes
- Setting up new components or utilities

## Instructions

### Initial Project Setup (ALWAYS FIRST - Multi-Tenancy Required)

**IMPORTANT**: Multi-tenancy with organizations is ALWAYS used in Rhino projects. This setup MUST be completed before any other model or feature setup.

1. **Install Organizations Engine**
   - Run the organizations install command: `rails rhino_organizations:install` (or equivalent generator)
   - This installs the organizations engine migrations and sets up the multi-tenancy foundation
   - Ensures the `rhino_project_organizations` gem is properly configured

2. **Run Migrations**
   - Run all migrations: `rails db:migrate`
   - This creates the organizations, users_roles, roles, and users_role_invites tables
   - Sets up the database schema for multi-tenancy

3. **Run Seeds**
   - Run seeds: `rails db:seed`
   - This creates initial roles, users_roles, organizations, and other seed data
   - Sets up the foundation data needed for the application

4. **Configure Rhino Base Owner**
   - Ensure `config/initializers/rhino.rb` has `config.base_owner = 'Organization'` uncommented
   - This enables organization-based multi-tenancy

**This initial setup must be completed before proceeding with any other setup tasks.**

### Backend Setup (After Initial Project Setup)

1. **Model Setup**
   - Create model file in `app/models/`
   - Add `rhino_owner` configuration
   - Add `rhino_references` for API exposure
   - Add validations and associations
   - Add model to `config/initializers/rhino.rb` resources array

2. **Migration Setup**
   - Generate migration with proper naming
   - Add columns with appropriate types
   - Add foreign key constraints
   - Add indexes for foreign keys and frequently queried columns
   - Run migration and verify schema

3. **Admin Setup** (if needed)
   - Create admin file in `app/admin/`
   - Configure ActiveAdmin resource
   - Add admin-specific functionality

### Frontend Setup

1. **Page Setup**
   - Create page component in `app/frontend/pages/`
   - Create route file in `app/frontend/routes/`
   - Use Rhino API hooks for data fetching
   - Build custom UI with HeroUI components

2. **Component Setup**
   - Create component in `app/frontend/components/`
   - Define TypeScript interfaces for props
   - Implement component logic
   - Add tests if needed

## Steps

### For New Projects:
1. **ALWAYS FIRST**: Set up multi-tenancy with organizations (install, migrate, seed)
2. Configure Rhino base owner in `config/initializers/rhino.rb`
3. Then proceed with feature setup

### For New Features:
1. Identify what needs to be set up (model, page, component, etc.)
2. Create necessary files following Rhino conventions
3. Configure Rhino-specific settings (rhino_owner, rhino_references, resources)
4. Add to appropriate configuration files
5. Test the setup

Use the ask questions tool if you need to clarify requirements or if any step is unclear.
