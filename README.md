<p align="center">
  <img src="./extra/image.png" title="image-header">
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

- Install all the required packages using the following command `npm install`. And start the project with the following scripts.

### - Scripts:

1. This script will start the project with the production environment:

```
npm run start
```

2. The following script will start the project with the development environment, starting postgresql and redis containers:

```
npm run start:dev
```

3. The next script will run the unit tests, starting postgresql and redis containers with the test databases:

```
npm run test:unit
```

4. The last script will run the integration tests, starting postgresql and redis containers with the test databases:

```
npm run test:int
```

</details>

<summary><h2>3. Project Structure</h2></summary>
<details>
<summary>Show info</summary>

<br>

- The project follows a layered pattern, with a hierarchical structure that includes a repository layer as a dependency for the service layer, which in turn serves as a dependency for the controller layer.

<p align="center">
  <img src="./extra/diagram.svg" title="uml-diagram-project">
</p>

- The main classes of the project are crafted using abstract classes, all of which are interconnected in a composition root layer. This thoughtful design ensures a clear and maintainable architecture, promoting modularity and ease of future development.

- Database

<p align="center">
  <img src="./extra/uml-db.svg" width=500 title="uml-diagram-project">
</p>

- The management of cached data is governed by flags within the system. When modifications are made to the database, the 'stale' flag is promptly set to true. This signals the method responsible for loading all tasks to initiate a data refresh. Simultaneously, the 'refreshing' flag is also activated, indicating that the data renewal process is underway. As an illustration, consider the scenario where a task is deleted, triggering the setting of the 'stale' flag to true. This systematic approach ensures that the system efficiently handles data updates, maintaining accuracy and responsiveness.

<p align="center">
  <img src="./extra/is-stale.png" width=500 title="is-stale">
</p>

- Within the findAll method of the TaskService, the system checks the isStale flag. It assesses whether another request is currently in the process of refreshing the data. If the stale flag is true and no other request is actively refreshing the data, the list of tasks undergoes a renewal process. This mechanism ensures that the data remains up-to-date and is refreshed only when necessary, optimizing the efficiency of the TaskService functionality.

<p align="center">
  <img src="./extra/is-refecthing.png" width=500 title="is-stale">
</p>

</details>

<summary><h2>4. Endpoints</h2></summary>
<details>
<summary>Show info</summary>

<br>

- This API provides comprehensive CRUD operations for managing both user details and tasks seamlessly. Additionally, it offers an authentication route that generates a token, facilitating access to other protected routes. This robust feature set empowers users to efficiently handle user information and task management while ensuring secure access to protected resources.

- Explore the details of all available endpoints by navigating to the following route. The documentation, crafted using the Swagger tool and adhering to the OpenAPI specification, offers a comprehensive guide to the API's structure and functionalities. This resource serves as a valuable reference for developers seeking a clear understanding of the API's capabilities and usage.

```
http://localhost:PORT/api-docs/
```

<p align="center">
  <img src="./extra/endpoints.png" title="is-stale">
</p>

</details>

<summary><h2>5. How to contribute?</h2></summary>
<details>
<summary>Show info</summary>

<h3>1. Fork this repository</h3>

<h3>2. Clone the repository</h3>

Open a terminal and run the following git command:

```
git clone "url you just copied"
```

<h3>3. Create a branch</h3>

```
git checkout -b your-new-branch-name
```

<h3>4. Make necessary changes and commit those changes</h3>

Add those changes to the branch you just created using the following command:

```
git add .
```

Now commit those changes using following command:

```
git commit -m "Briefly describe the changes made"
```

<h3>5. Push changes to GitHub</h3>

Push your changes using the following command:

```
git push -u origin your-branch-name
```

<h3>6. Submit your changes for review on GitHub</h3>

<br>

</details>

<h2>Contact Information:</h2>

- Questions and feedbacks are very welcome.

- Email: lukas.veiga10@gmail.com
