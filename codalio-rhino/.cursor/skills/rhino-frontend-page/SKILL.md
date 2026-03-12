---
name: rhino-frontend-page
description: Create new custom frontend pages with routing. Use when creating new pages that need custom routes, data fetching with Rhino hooks, and custom UI components. DO NOT use auto-generated model pages.
---

# Rhino Frontend Page

Create custom frontend pages with routing, data fetching using Rhino API hooks, and custom UI components. Do NOT use ModelIndexPage, ModelEditPage, ModelShowPage, or ModelCreatePage.

## When to Use

- Creating a new page/screen
- Building feature-specific pages
- Creating custom list or detail views
- Setting up new routes

## Instructions

### Step 1: Create Page Component

Create page component in `app/frontend/pages/`:

```tsx
import { useModelIndex } from '@rhino-project/core/hooks';
import { Container, Card, CardBody, Spinner } from '@heroui/react';

const BlogsPage = () => {
  const { resources, isPending, error } = useModelIndex('blog');
  
  if (isPending) return <Spinner />;
  if (error) return <div>Error loading blogs</div>;
  
  return (
    <Container>
      <h1>Blogs</h1>
      {resources?.results?.map(blog => (
        <Card key={blog.id}>
          <CardBody>{blog.name}</CardBody>
        </Card>
      ))}
    </Container>
  );
};

export default BlogsPage;
```

### Step 2: Create Route File

Create route file in `app/frontend/routes/` following TanStack Router file-based routing:

```tsx
import { createFileRoute } from '@tanstack/react-router';
import BlogsPage from '../../pages/BlogsPage';

export const Route = createFileRoute('/_authenticated/$owner/blogs/')({
  component: BlogsPage
});
```

### Step 3: Use Appropriate Rhino Hooks

- **List/Index pages**: Use `useModelIndex` with filters, pagination, sorting
- **Detail/Show pages**: Use `useModelShow` with resource ID
- **Create forms**: Use `useModelCreate` hook
- **Edit forms**: Use `useModelShow` to fetch + `useModelUpdate` to save

### Step 4: Build Custom UI

- Use HeroUI components for UI
- Handle loading states
- Handle error states
- Handle empty states
- Build custom layouts

## Important Notes

- **DO NOT** use ModelIndexPage, ModelEditPage, ModelShowPage, ModelCreatePage
- **DO** build custom pages using Rhino hooks and HeroUI
- All routes should be custom and feature-specific
- Use `useModelIndex`, `useModelShow`, `useModelCreate`, `useModelUpdate`, `useModelDelete` hooks

Use the ask questions tool if you need to clarify page requirements, data fetching needs, or UI design.
