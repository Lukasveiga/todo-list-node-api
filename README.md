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

- [ ] Endpoints with validation (express-validator);
- [ ] Authentication and Authorization (JWT) and in-memory data store (Redis);
- [ ] Unit and Integration tests (Jest);
