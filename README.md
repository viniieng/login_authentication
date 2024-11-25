# Authentication Project with React, Next.js, Prisma, Tailwind, Serverless, and PostgreSQL

This is a full-stack authentication project built using the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for building static and dynamic websites with server-side rendering and routing.
- **Prisma**: An ORM (Object Relational Mapping) for PostgreSQL to interact with the database.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Serverless**: A framework for deploying applications in a serverless architecture.
- **PostgreSQL**: A relational database used to store user data, including login credentials.

The project provides user authentication features like user registration, login, password hashing, and session management via cookies with hashed tokens.

## Technologies Used

<ul>
  <li><strong>React</strong>: Frontend library for building interactive UIs.</li>
  <li><strong>Next.js</strong>: Framework built on top of React that supports server-side rendering, static generation, and routing.</li>
  <li><strong>Prisma</strong>: ORM to handle PostgreSQL database interactions in a more type-safe way.</li>
  <li><strong>Tailwind CSS</strong>: Utility-first CSS framework for building custom designs quickly.</li>
  <li><strong>Serverless</strong>: A serverless architecture used for deploying the application.</li>
  <li><strong>PostgreSQL</strong>: A powerful, open-source relational database management system.</li>
</ul>

## Features

- **User Registration**: Create an account with email and password.
- **Login System**: Users can log in using email and password.
- **Password Hashing**: User passwords are securely hashed before being stored in the database.
- **Session Management with Cookies**: Uses cookies with hashed tokens to manage user sessions across requests.
- **Responsive UI**: Built with Tailwind CSS to ensure a clean, responsive design.

## API Endpoints

### 1. **POST** `/api/auth/register`  
   Registers a new user by providing an email and password.

### 2. **POST** `/api/auth/login`  
   Authenticates an existing user using email and password. Upon successful login, a cookie is set with a hashed token that identifies the user.

---

## How to Run the Project

### Prerequisites

Ensure that you have the following tools installed:

- **Node.js** (version 14 or higher)
- **npm** (or **yarn**) for package management
- **PostgreSQL** for the database
- **Serverless Framework** for deploying serverless functions
