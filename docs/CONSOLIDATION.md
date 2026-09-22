# Nuclear Repository Consolidation

Canonical target: `Foxfusion/Superman-React-Dev`

Reviewed source repositories:

- `Foxfusion/project-nuclear`
- `Foxfusion/project-nuclear-react`
- `Foxfusion/proj_nuclear`
- `Foxfusion/Superman-React-Dev`

## What was merged

The canonical codebase keeps the current Superman React UI and integrates useful functionality found in the older repositories:

- stronger JWT login behavior
- `/api/auth/me`
- protected Projects CRUD endpoints
- database health endpoint
- scrape queue/throttle routes
- idle-session logout
- environment-based database configuration

## What was intentionally not merged

The alternate Vite/TypeScript/Prisma frontend/backend scaffold from `project-nuclear-react` was not layered on top of the current Create React App code in the same merge. Mixing both build systems would create two competing frontend architectures.

That repository should be archived, not deleted, so the alternate implementation remains available for reference.

The MLflow run artifacts in `proj_nuclear` were also not copied into the application repository. Model artifacts belong in MLflow/object storage rather than the web application's Git history.

## Security cleanup

Tracked IDE metadata, `.env`, and `node_modules` are removed from the canonical branch and ignored going forward.

An older source repository contained a database credential directly in source code. That credential was not copied into the consolidated codebase and should be rotated because it exists in Git history.
