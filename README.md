Project Package Documentation

1. react
Purpose: React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and manage the application state in an efficient way.

Usage: Used throughout the project to build the UI components like the authentication form, dashboard, and map.

2. react-dom
Purpose: React DOM serves as the entry point for the DOM-related operations in a React application. It is responsible for rendering React components into the actual DOM of the web page.

Usage: Used to render the React components into the root element of the web page.

3. react-router-dom
Purpose: React Router DOM is used for navigation in single-page applications. It allows you to set up routes and link between different components/views.

Usage: Used to handle client-side routing, enabling the navigation between the login page, dashboard, and map views.

4. Fetch
Purpose: Fetch is a promise-based HTTP client for making requests to the backend server.

Usage: Used to send HTTP requests for authentication (e.g., login, registration) and fetching data related to maps and user-specific information.

5. jsonwebtoken
Purpose: JSON Web Token (JWT) is used for securely transmitting information between the client and server.

Usage: Used to generate and verify authentication tokens that allow secure login and session management.

6. leaflet
Purpose: Leaflet is an open-source JavaScript library for interactive maps.

Usage: Used for integrating OpenStreetMap into the React project and providing map-related functionalities like zooming, panning, and placing markers.

7. react-leaflet
Purpose: React-Leaflet is a React wrapper for Leaflet, enabling seamless integration of Leaflet's features into React applications.

Usage: Used to embed Leaflet maps into React components and handle map rendering and interactions.

11. dotenv
Purpose: The dotenv package loads environment variables from a .env file into process.env.

Usage: Used to store sensitive information such as API keys or authentication secrets securely without hardcoding them into the code.

12. cors
Purpose: CORS (Cross-Origin Resource Sharing) is a middleware used to handle HTTP requests from different domains.

Usage: Used in the backend to enable the frontend (React) to make requests to the server without facing CORS issues.

13. bcryptjs
Purpose: Bcrypt is a library to hash passwords and verify them securely.

Usage: Used to hash user passwords before storing them in the database and verify passwords during the login process.

14. express
Purpose: Express is a fast, unopinionated web framework for Node.js used to build backend services.

Usage: Used to create the API routes for user authentication and data management, which the frontend makes requests to.

Usage: Used to interact with the MongoDB database, managing user data, sessions, and any other required data models.
