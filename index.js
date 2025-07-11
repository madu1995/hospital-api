const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

// cors is a middleware that allows cross-origin requests
var cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const doctorRoute = require("./routes/doctor-route");
const patientRoute = require("./routes/patient-route");
const booksRoute = require("./routes/books-route");
const carsRoute = require("./routes/cars-route");
const registerRoute = require("./routes/register-route");

// parse application/x-www-form-urlencoded
app.use(express.urlencoded());

// parse application/json
app.use(express.json());

app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/patients", patientRoute);
app.use("/api/v1/books", booksRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/register", registerRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
