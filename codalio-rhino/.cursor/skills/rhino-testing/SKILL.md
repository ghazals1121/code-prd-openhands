---
name: rhino-testing
description: Set up tests for Rhino features. Use when creating test files for models, controllers, frontend components, or setting up test infrastructure.
---

# Rhino Testing

Set up tests for Rhino features including backend tests (Minitest), frontend tests (Vitest), and end-to-end tests (Cypress).

## When to Use

- Writing tests for new features
- Setting up test infrastructure
- Creating test fixtures or factories
- Ensuring test coverage

## Instructions

### Backend Tests (Minitest)

**Model Tests** (`test/models/blog_test.rb`):
```ruby
require 'test_helper'

class BlogTest < ActiveSupport::TestCase
  test "should require name" do
    blog = Blog.new
    assert_not blog.valid?
    assert_includes blog.errors[:name], "can't be blank"
  end
  
  test "should belong to organization" do
    blog = blogs(:one)
    assert_not_nil blog.organization
  end
end
```

**Controller Tests** (`test/controllers/blogs_controller_test.rb`):
```ruby
require 'test_helper'

class BlogsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_blogs_url, headers: auth_headers
    assert_response :success
  end
end
```

### Frontend Tests (Vitest)

**Component Tests** (`app/frontend/__tests__/BlogList.spec.tsx`):
```tsx
import { render, screen } from '@testing-library/react';
import { BlogList } from '../BlogList';

vi.mock('@rhino-project/core/hooks', () => ({
  useModelIndex: () => ({
    resources: { results: [{ id: 1, name: 'Test Blog' }] },
    isPending: false
  })
}));

describe('BlogList', () => {
  it('renders blogs', () => {
    render(<BlogList />);
    expect(screen.getByText('Test Blog')).toBeInTheDocument();
  });
});
```

### E2E Tests (Cypress)

**Feature Tests** (`cypress/e2e/blogs.cy.js`):
```javascript
describe('Blogs', () => {
  it('should create a blog', () => {
    cy.visit('/blogs');
    cy.get('[data-testid="create-blog"]').click();
    cy.get('input[name="name"]').type('New Blog');
    cy.get('button[type="submit"]').click();
    cy.contains('New Blog').should('be.visible');
  });
});
```

## Test Setup

1. Create test file in appropriate directory
2. Set up test data (factories, fixtures, mocks)
3. Write test cases
4. Run tests and verify they pass
5. Ensure adequate coverage

Use the ask questions tool if you need to clarify testing requirements, test scenarios, or test data setup.
