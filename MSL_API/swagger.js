const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "2.0",
    title: "CODESPARTAN APIs",
    description: "These are apis used in the coding platform - CODESPARTAN.",
  },
  host: "",
  basePath: "/codespartan/apis",
  schemes: ["http"],
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    // {
    //   name: '',         // Tag name
    //   description: '',  // Tag description
    // },
    // { ... }
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object (Swagger 2.0)
  components: {}, // by default: empty object (OpenAPI 3.x)
};

const outputFile = "./swagger_output.json";
const routes = ["./routes/coding-platform-routes.js"];

swaggerAutogen(outputFile, routes, doc);
