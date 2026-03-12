---
name: rhino-debugging
description: Debug common Rhino issues. Use when troubleshooting errors, investigating bugs, or resolving issues in Rhino applications.
---

# Rhino Debugging

Troubleshooting guides and debugging patterns for common Rhino issues.

## When to Use

- Investigating errors or bugs
- Troubleshooting API issues
- Debugging authentication problems
- Resolving data fetching issues
- Fixing migration problems

## Common Issues & Solutions

### Backend Issues

**Model not appearing in API:**
- Check model is in `config/initializers/rhino.rb` resources array
- Verify `rhino_references` is configured
- Check `rhino_owner` is set correctly

**Migration errors:**
- Check migration syntax
- Verify foreign key constraints
- Ensure indexes are properly defined
- Check for migration conflicts

**Authentication issues:**
- Verify Devise Token Auth configuration
- Check token is being sent in headers
- Verify user is authenticated
- Check organization context

### Frontend Issues

**Data not loading:**
- Check `useModelIndex` or `useModelShow` hook usage
- Verify model name is correct
- Check network requests in browser dev tools
- Verify authentication token is present

**Hooks not working:**
- Check imports from `@rhino-project/core/hooks`
- Verify Rhino context is provided
- Check hook parameters are correct
- Verify model exists in resources

**Routing issues:**
- Check route file structure
- Verify route parameters
- Check authentication guards
- Verify route is in route tree

## Debugging Steps

1. **Identify the Issue**
   - Read error messages carefully
   - Check browser console (frontend)
   - Check Rails logs (backend)
   - Check network tab for API calls

2. **Isolate the Problem**
   - Reproduce the issue
   - Identify what's working vs not working
   - Check related components/files
   - Verify configuration

3. **Check Common Causes**
   - Configuration issues
   - Missing dependencies
   - Incorrect hook usage
   - Authentication/authorization problems

4. **Apply Fix**
   - Fix the root cause
   - Test the fix
   - Verify related functionality still works

## Tools

- **Backend**: Rails console, logs, debugging gems
- **Frontend**: Browser dev tools, React DevTools, network tab
- **API**: Check network requests, verify responses

Use the ask questions tool if you need to clarify the issue, understand error messages, or get more context about the problem.
