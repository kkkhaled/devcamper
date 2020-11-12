const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieparser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const path = require("path");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const xss = require("xss-clean");
const errorHandler = require("./middleware/error");

const connectDB = require("./config/db");

//load env variable
dotenv.config({ path: "./config/config.env" });
const app = express();

//body parser
app.use(express.json());

// using cookie parser
app.use(cookieparser());
//connect to database
connectDB();

//Dev logging middleware
if (process.env.Node_ENV === "development") {
  app.use(morgan("dev"));
}
const PORT = process.env.PORT || 5000;

// file upload
app.use(fileupload());

//sanitize data
app.use(mongoSanitize());

//set secure headers
app.use(helmet());
//prevent xss attack
app.use(xss());
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);
// Prevent http param pollution
app.use(hpp());
// set static folder
// Enable CORS
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
//mount routes
app.use("/api/v1/bootcamps", require("./routes/bootcamps"));
app.use("/api/v1/courses", require("./routes/courses"));
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/reviews", require("./routes/reviews"));
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.Node_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error,${err.message}`.red);
  server.close(() => p1.exit(1));
});
