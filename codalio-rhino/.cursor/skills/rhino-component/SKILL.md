---
name: rhino-component
description: Create reusable React components. Use when building custom React components with TypeScript types, props interfaces, and proper component structure.
---

# Rhino Component

Create reusable React components with TypeScript types, props interfaces, and proper component structure using HeroUI.

## When to Use

- Creating reusable UI components
- Building component libraries
- Extracting common patterns into components
- Creating feature-specific components

## Instructions

### Step 1: Create Component File

Create component in `app/frontend/components/`:

```tsx
import { Card, CardBody, Button } from '@heroui/react';

interface BlogCardProps {
  blog: {
    id: number;
    name: string;
    description?: string;
  };
  onSelect?: (blog: { id: number; name: string }) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, onSelect }) => {
  return (
    <Card>
      <CardBody>
        <h3>{blog.name}</h3>
        {blog.description && <p>{blog.description}</p>}
        {onSelect && (
          <Button onClick={() => onSelect(blog)}>Select</Button>
        )}
      </CardBody>
    </Card>
  );
};
```

### Step 2: Define TypeScript Interfaces

- Define clear prop interfaces
- Use TypeScript for type safety
- Document component props
- Handle optional vs required props

### Step 3: Implement Component Logic

- Use React hooks appropriately
- Handle component state
- Implement event handlers
- Compose with HeroUI components

### Step 4: Export Component

- Export component properly
- Create index file if needed
- Document component usage

## Best Practices

- Single responsibility principle
- Composable and reusable
- Well-typed with TypeScript
- Accessible (ARIA attributes)
- Documented with comments

Use the ask questions tool if you need to clarify component requirements, props, or functionality.
