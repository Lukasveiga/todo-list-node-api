# **To-Do List API with nodeJs + Express + MySQL**

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

- The tasks will be ordered by priority, ranging from 0 to 10 where 0 is the lowest priority and 10 is the highest priority.
