const swaggerJSDoc = require("swagger-jsdoc");
const port = 3000;


const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
    title: "Shopping API Documentation",
    version: "1.0.0",
    description: "Implementation of CRUD And Authentication on 3 resources project",
    contact: { name: "Inf24dw2g01" },
    },
    servers: [ {url: "http://localhost:" + port,},],
}

const options = {
    swaggerDefinition,
    apis: ["./docs/**/*.yaml"],
    };


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;