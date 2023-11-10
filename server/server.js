// Libraries
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const routes = require("./routes/index");
const app = express();

// Middlewares
const customErrorHandler = require("./middlewares/errors/customErrorHandler");

// Helpers
const connectMongoDB = require("./helpers/databases/mongodb");

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(express.static(path.join(__dirname, "public")));
app.use(customErrorHandler);
dotenv.config();

// Database app connections
connectMongoDB();
app.listen(process.env.PORT, () => {
  console.log(`App started on ${process.env.PORT} : ${process.env.NODE_ENV}`);
});
