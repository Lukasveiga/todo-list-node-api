# **To-Do List API with nodeJs + Express + PostgreSQL**

- **User Model:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "todoList": ["tasks"]
}
```

- **Task Model:**

```json
{
  "title": "string",
  "description": "string",
  "finished": "boolean",
  "createdAt": "Date",
  "finishedAt": "Date",
  "priority": "integer"
}
```

- The tasks will be ordered by priority, ranging from 0 to 5 where 0 is the lowest priority and 5 is the highest priority.

## **Check List Future Features to be implemented:**

- [x] Endpoints with validation (joi);
- [x] Authentication (JWT)
- [ ] In-memory data store (Redis);
- [ ] Logs with Pino;
- [x] Unit and Integration tests (Jest);
