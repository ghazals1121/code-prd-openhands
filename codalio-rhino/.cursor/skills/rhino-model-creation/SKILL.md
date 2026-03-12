---
name: rhino-model-creation
description: Create a new Rhino model with all required setup. Use when creating a new model that needs migration, rhino configuration, validations, associations, and admin interface.
---

# Rhino Model Creation

Create a complete Rhino model with all required setup including model file, migration, Rhino configuration, validations, associations, and admin interface.

## When to Use

- Creating a new model from scratch
- Adding a new resource to the Rhino API
- Setting up a new database entity

## Instructions

### Step 1: Create Model File

Create the model in `app/models/` with:
- Proper class name (singular, PascalCase)
- Inherit from `ApplicationRecord` or Rhino base class
- Add `rhino_owner` for multi-tenancy
- Add `rhino_references` for API exposure
- Add validations
- Define associations

Example:
```ruby
# frozen_string_literal: true

class Blog < ApplicationRecord
  belongs_to :organization
  has_many :posts, dependent: :destroy
  
  rhino_owner :organization
  rhino_references [:organization]
  
  validates :name, presence: true
  validates :organization, presence: true
end
```

### Step 2: Create Migration

Generate migration:
```bash
rails generate migration CreateBlogs organization:references name:string
```

Add to migration:
- Foreign key constraints
- Indexes on foreign keys
- Indexes on frequently queried columns
- Timestamps

### Step 3: Add to Rhino Resources

Add model to `config/initializers/rhino.rb`:
```ruby
config.resources += ["Blog"]
```

### Step 4: Create Admin Interface (Optional)

Create `app/admin/blog.rb`:
```ruby
ActiveAdmin.register Blog do
  # Admin configuration
end
```

### Step 5: Run Migration

```bash
rails db:migrate
```

### Step 6: Verify

- Check model file is correct
- Verify migration ran successfully
- Check model is in resources array
- Test model in console

Use the ask questions tool if you need to clarify model requirements, relationships, or ownership structure.
