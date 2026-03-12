---
name: rhino-shell-creation
description: Create custom application shell to replace ApplicationShell. Use when building custom shell components with navigation, layout, and authentication integration.
---

# Rhino Shell Creation

Create custom application shell component to replace ApplicationShell from ui-heroui. Build custom shell with navigation, layout, and authentication integration.

## When to Use

- Replacing ApplicationShell with custom implementation
- Building custom navigation structures
- Creating application layouts
- Integrating authentication and organization context

## Instructions

### Step 1: Create Shell Component

Create shell component in `app/frontend/components/app/ApplicationShell.tsx`:

```tsx
import { useUser, useBaseOwnerId } from '@rhino-project/core/hooks';
import { useRhinoContext } from '@rhino-project/core';
import { Navbar, NavbarContent, NavbarItem, Container } from '@heroui/react';

interface ApplicationShellProps {
  children: React.ReactNode;
}

export const ApplicationShell: React.FC<ApplicationShellProps> = ({ children }) => {
  const user = useUser();
  const baseOwnerId = useBaseOwnerId();
  const { rhino } = useRhinoContext();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar>
        <NavbarContent>
          <NavbarItem>Logo</NavbarItem>
          {/* Add navigation items */}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>{user?.name || user?.email}</NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className="flex-1">
        <Container>
          {children}
        </Container>
      </main>
    </div>
  );
};
```

### Step 2: Create Navigation Components

Create primary and secondary navigation components:

```tsx
// PrimaryNavigation.tsx
export const PrimaryNavigation = () => {
  return (
    <nav>
      {/* Navigation items */}
    </nav>
  );
};
```

### Step 3: Integrate with Rhino Context

- Use `useUser()` for current user
- Use `useBaseOwnerId()` for current organization
- Use `useRhinoContext()` for Rhino context
- Handle organization switching if needed

### Step 4: Replace ApplicationShell Usage

Update route files to use custom shell:
```tsx
import { ApplicationShell } from '../../components/app/ApplicationShell';

function RouteComponent() {
  return (
    <ApplicationShell>
      <Outlet />
    </ApplicationShell>
  );
}
```

## Important Notes

- **DO NOT** use ApplicationShell from `@rhino-project/ui-heroui`
- **DO** build completely custom shell component
- Integrate with Rhino context for authentication and organization
- Use HeroUI components for shell UI

Use the ask questions tool if you need to clarify shell requirements, navigation structure, or layout design.
