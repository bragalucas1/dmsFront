
# Front-End Project Setup and Execution Guide

Welcome to the front-end of this project. This document provides a step-by-step guide to install, configure, and run the front-end application.

---

## **Overview**

This front-end project is a React-based application designed to interact with a back-end service. It includes modern front-end features such as routing, component-based architecture, and integration with APIs.

---

## **Prerequisites**

Ensure the following software is installed on your system:

- **Node.js** (v16 or later) - [Download Node.js](https://nodejs.org/)
- **npm** (v7 or later) or **Yarn** (optional) - Installed with Node.js
- **Git** - [Download Git](https://git-scm.com/)

---

## **Installation Steps**

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-repo/front-end.git
cd dmsFront
```

### 2. **Install Dependencies**

Use npm or yarn to install the required dependencies:

```bash
npm install
```

OR

```bash
yarn install
```


## **Running the Application**

### **Development Mode**

To start the development server with hot-reloading:

```bash
npm start
```

### **Production Mode**

1. Build the application:

   ```bash
   npm start
   ```

## **Scripts**

Here are the commonly used npm scripts:

| Script            | Description                                  |
|--------------------|----------------------------------------------|
| `npm start`        | Start the development server                |
| `npm run build`    | Build the application for production         |
| `npm run test`     | Run the test suite                          |
| `npm run lint`     | Run the linter for code style checks         |

---

## **Folder Structure**

Below is the key folder structure of the project:

```
front-end/
├── public/          # Static files
├── src/
│   ├── assets/      # Images, fonts, and other static assets
│   ├── components/  # Reusable React components
│   ├── pages/       # Page components for routing
│   ├── routes/      # Route definitions and guards
│   ├── services/    # API calls and service logic
│   ├── styles/      # Global and component-specific styles
│   ├── utils/       # Utility functions
│   ├── App.tsx      # Main application component
│   └── index.tsx    # Application entry point
├── .env.example     # Environment variable example file
├── package.json     # Project metadata and dependencies
├── tsconfig.json    # TypeScript configuration file
└── README.md        # Project documentation
```

---

## **Testing**

Run the test suite to ensure the application is working correctly:

```bash
npm test
```

For tests with coverage:

```bash
npm run test:coverage
```

---


## **Contributing**

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## **License**

This project is licensed under the [MIT License](LICENSE).
