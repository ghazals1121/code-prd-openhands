---
name: rhino-api-integration
description: Integrate with Rhino backend APIs using core hooks directly. Use when fetching data, performing mutations, or managing API state. Use hooks from @rhino-project/core, NOT components from ui-heroui.
---

# Rhino API Integration

Integrate with Rhino backend APIs using `@rhino-project/core` hooks directly. Use hooks for data fetching and mutations, NOT components from `@rhino-project/ui-heroui`.

## When to Use

- Fetching data from Rhino API
- Creating, updating, or deleting resources
- Managing API state and cache
- Handling API errors

## Instructions

### Data Fetching

Use `useModelIndex` for lists:
```tsx
import { useModelIndex } from '@rhino-project/core/hooks';

const { resources, isPending, error } = useModelIndex('blog', {
  filters: { published: true },
  order: 'created_at',
  limit: 10,
  offset: 0
});
```

Use `useModelShow` for single resources:
```tsx
import { useModelShow } from '@rhino-project/core/hooks';

const { resource, isPending } = useModelShow('blog', blogId);
```

### Mutations

Create resources:
```tsx
import { useModelCreate } from '@rhino-project/core/hooks';

const { mutate: createBlog, isPending } = useModelCreate('blog', {
  onSuccess: () => {
    // Handle success
  },
  onError: (error) => {
    // Handle error
  }
});

// Call mutation
createBlog({ name: 'New Blog', organization_id: orgId });
```

Update resources:
```tsx
import { useModelUpdate } from '@rhino-project/core/hooks';

const { mutate: updateBlog, isPending } = useModelUpdate('blog', {
  onSuccess: () => {
    // Handle success
  }
});

updateBlog({ id: blogId, name: 'Updated Name' });
```

Delete resources:
```tsx
import { useModelDelete } from '@rhino-project/core/hooks';

const { mutate: deleteBlog, isPending } = useModelDelete('blog', {
  onSuccess: () => {
    // Handle success
  }
});

deleteBlog({ id: blogId });
```

### State Management

Use `useModelIndexController` for managing index state:
```tsx
import { useModelIndexController } from '@rhino-project/core/hooks';

const controller = useModelIndexController({
  model: 'blog',
  defaultFilter: { published: true }
});

// Access: controller.results, controller.filters, controller.setFilter, etc.
```

## Key Hooks

- `useModelIndex`: List resources
- `useModelShow`: Get single resource
- `useModelCreate`: Create resource
- `useModelUpdate`: Update resource
- `useModelDelete`: Delete resource
- `useModelIndexController`: Manage index state
- `useModelShowController`: Manage show/edit state

## Important Notes

- **DO NOT** use components from `@rhino-project/ui-heroui`
- **DO** use hooks from `@rhino-project/core/hooks`
- Build custom UI components that use these hooks
- Handle loading, error, and success states

Use the ask questions tool if you need to clarify API requirements, data structures, or error handling needs.
