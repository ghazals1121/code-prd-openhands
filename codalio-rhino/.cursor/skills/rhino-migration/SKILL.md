---
name: rhino-migration
description: Create and manage database migrations following Rhino conventions. Use when modifying database schema, adding columns, creating tables, or handling data migrations.
---

# Rhino Migration

Create and manage database migrations following Rhino conventions with proper indexes, foreign keys, and constraints.

## When to Use

- Creating new tables
- Adding or modifying columns
- Adding indexes
- Creating foreign key constraints
- Performing data migrations

## Instructions

### Creating a Migration

1. **Generate Migration**
   ```bash
   rails generate migration MigrationName
   ```

2. **Add Schema Changes**
   - Use appropriate migration methods
   - Add columns with proper types
   - Add foreign keys with `references` or `add_foreign_key`
   - Add indexes for foreign keys and frequently queried columns

3. **Follow Rhino Patterns**
   - Add `organization_id` foreign key for organization-owned resources
   - Include `created_at` and `updated_at` timestamps
   - Add indexes on foreign keys
   - Consider soft deletes with `deleted_at` if needed

### Example Migration

```ruby
class CreateBlogs < ActiveRecord::Migration[8.0]
  def change
    create_table :blogs do |t|
      t.references :organization, null: false, foreign_key: true
      t.string :name, null: false
      t.text :description
      t.timestamps
    end
    
    add_index :blogs, :organization_id
    add_index :blogs, :name
  end
end
```

### Adding Columns

```ruby
class AddPublishedToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :published, :boolean, default: false, null: false
    add_index :posts, :published
  end
end
```

### Data Migrations

For data migrations, use `up` and `down` methods:
```ruby
class MigratePostStatus < ActiveRecord::Migration[8.0]
  def up
    Post.where(status: 'active').update_all(published: true)
  end
  
  def down
    Post.where(published: true).update_all(status: 'active')
  end
end
```

## Best Practices

- Always test migrations in development first
- Use transactions for data migrations when possible
- Add indexes for foreign keys and frequently queried columns
- Consider production downtime for large migrations
- Keep migrations focused and atomic
- Test rollback procedures

Use the ask questions tool if you need to clarify migration requirements, data safety concerns, or rollback strategies.
