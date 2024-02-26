# Blogify

This project was created in educational purposes to get experience in working with `Docker`, `PostgreSQL`, `knex.js` and `express.js`.

## Usage

```bash
docker compose up
```

### PostgreSQL

- Creating migrations using knex.js migrating feature. In this project knex.js is using to manipulate PostgreSQL database.
  After Docker container started run these commands inside container:

  - Running existed migrations (will create tables, since there is creating tables migration)

  ```
  npm migration:up
  ```

  - Generating new migrations in folder with migrations, in this case ./src/common/postgresql/migrations/

  ```
  npm migration:create <NameOfTheMigration>
  ```

  - Roll back the latest migration

  ```
  npm migration:rollback
  ```
