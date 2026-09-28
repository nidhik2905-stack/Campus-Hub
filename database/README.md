# Database Setup

This folder is reserved for the initial database foundation for the Campus Information Assistant project.

## Current Phase
Phase 0 — Foundation only.

## Planned Structure
- schema/: SQL schema files for tables and model definitions
- seed/: seed data and starter records for testing and development
- queries/: reusable SQL queries and reports
- migrations/: versioned migration scripts
- diagrams/: ERD and database relationship documentation

## Database Name
The current project database is planned as:

campus_hub

## Important Notes
- This is not the full production schema yet.
- The first actual schema will be created in the next database phase.
- Connection configuration should use environment variables, not hardcoded secrets.
- MySQL should be provisioned locally or through Docker Compose for integration work.
