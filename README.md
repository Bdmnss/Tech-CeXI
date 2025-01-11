# Tech-CeXI

**Tech-CeXI** is a modern **Admin Panel website** built with TypeScript and Vite. The project features user management, authentication, and profile management functionalities. It follows a modular structure for better organization, scalability, and maintainability. This project is designed to demonstrate efficient architecture, reusable components, and best practices in web development.

## Technologies and Libraries

This project incorporates the following technologies and libraries:

- **[React](https://react.dev/)**: A JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: A strongly typed programming language that builds on JavaScript.
- **[Vite](https://vitejs.dev/)**: A fast and modern build tool for web projects.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for styling.
- **[Yup](https://github.com/jquense/yup)**: A schema validation library.
- **[Ant Design (antd)](https://ant.design/)**: A popular UI library for React.
- **[Axios](https://axios-http.com/)**: A promise-based HTTP client for making API requests.
- **[Formik](https://formik.org/)**: A library for building and managing forms in React.
- **[React-Toastify](https://fkhadra.github.io/react-toastify/)**: A library for toast notifications.
- **[React-DOM](https://react.dev/learn/start-a-new-react-project#react-dom)**: A package for rendering React components to the DOM.
- **[React-Icons](https://react-icons.github.io/react-icons/)**: A library for including scalable vector icons.
- **[React-Router-DOM](https://reactrouter.com/)**: A library for client-side routing in React.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Setup and Run the Project](#setup-and-run-the-project)
- [Login Information](#login-information)

---

## Project Structure

The project follows a modular structure to separate concerns and ensure maintainability. Below is a high-level view of the project structure:

```bash
Tech-CeXI/
├── public/
├── src/
│ ├── assets/
│ ├── atoms/
│ ├── components/
│ ├── guards/
│ ├── hooks/
│ ├── modals/
│ ├── pages/
│ ├── services/
│ ├── types/
│ ├── validationSchemas/
│ ├── App.css
│ ├── App.tsx
│ ├── index.css
│ ├── main.tsx
│ ├── vite-env.d.ts
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts

```

---

## Setup and Run the Project

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Bdmnss/Tech-CeXI.git
   cd Tech-CeXI

   ```

2. **Create a .env file:**

Create a .env file in the root directory and add the following line:

```bash
VITE_API_BASE_URL=https://dummyjson.com

```

3. **Install dependencies:**

Run the following command to install the required dependencies:

```bash
npm install

```

4. **Run the development server:**

Start the development server with:

```bash
npm run dev

```

## Login Information

To log in, you must choose a user from the JSON list available on the [DummyJSON Users API](https://dummyjson.com/users). The requests are made following the guidelines in the [DummyJSON API Documentation](https://dummyjson.com/docs/users).
