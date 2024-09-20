const express = require("express");
const sequelize = require("./configDB");
const authRouter = require("./routes/auth");
const { errorHandler } = require("./middleware/error-handler");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
const multerRoutes = require('./middleware/multer');
const path = require("path");
const userCourseMappingRoutes = require('./routes/userCourseMappingRoutes');
const codingRouter=require('./routes/coding-platform-routes')
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();


// CORS middleware should be applied before routes
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:4200","http://localhost:3001" ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization']
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(
  "/codespartan/apis/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
app.use('/codespartan/apis', userCourseMappingRoutes);
app.use('/api/user-course', userCourseMappingRoutes);
app.use("/codespartan/apis", authRouter);
app.use("/codespartan/apis", codingRouter);

app.use(errorHandler);
app.get("/", (req, res, next) => {
  res.send("CodeSpartan APIs are available.");
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/job', jobApplicationRoutes);
app.listen(PORT, () => {
  console.log(`Server connected at PORT ${PORT}`);
});
