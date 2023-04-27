import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import orders from "./api/orders.route.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(cors());

app.options("*", cors());

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.use(
  "/api/orders",
  verifyToken,
  (req, res, next) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
  },
  orders
);

// JWT
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are correct
  if (username === "myuser" && password === "mypassword") {
    // Mock user
    const user = {
      id: 1,
      username: username,
      email: "user@example.com",
    };

    // Generate a JWT
    jwt.sign({ user: user }, "secretkey", (err, token) => {
      if (err) {
        res.status(500).json({ error: "Failed to generate token" });
      } else {
        res.json({
          token: token,
        });
      }
    });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

// Verify Token
function verifyToken(req, res, next) {
  //Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // set token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./api/orders.route.js"],
};

// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options);

// Serve swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
