<p align="center">
  <img src="image.png" title="image-header">
</p>

# **To-Do List API with NodeJs + Express + PostgreSQL**

First of all, what is a To-Do List? It is a list of all the tasks that you need to complete. In summary, it lists all the things you need to do, ordered by priority.

At first glance, this project may appear similar to any other to-do list project, but it's not. This API aims to put into practice a variety of backend development concepts necessary to build a robust backend project.

What concepts will you find in this project?

1. Layered pattern (repository, service, controller);
2. Unit and integration tests;
3. Database containerization;
4. Clean Code principles;
5. SOLID principles like single responsibility and dependency injection;
6. Caching;

<summary><h2>1. Project Information</h2></summary>
<details>
<summary>Show info</summary>

<br>

- Node version: 18.16.0
- Framework: Express
- Database: PostgreSQL + Redis (cache)
- ORM: Sequelize
- Design Pattern: Layered Architecture + Composition Root
- Authentication: Json Web Token
- Validation: Joi
- Tests: Jest
- Logs: Winston

</details>

<summary><h2>2. Locally Project Setup</h2></summary>
<details>
<summary>Show info</summary>

<br>

- Create a `.env` file following the `.env.example` structure and fill all information about server, database, security and log configurations.

```
# Server configurations
PORT=

# Database configurations
DB_HOST_DEV=
DB_PORT_DEV=
DB_USER_DEV=
DB_PASSWORD_DEV=
DB_NAME_DEV=

DB_HOST_TEST=
DB_PORT_TEST=
DB_USER_TEST=
DB_PASSWORD_TEST=
DB_NAME_TEST=

# Jwt configurations
SECRET_KEY=

# Log configuration
LOG_LEVEL=
```

### - Scripts:

</details>

<summary><h2>3. Project Structure</h2></summary>
<details>
<summary>Show info</summary>

<br>

</details>
