const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Adoption API",
            version: "1.0.0",
            description: "API REST para gestión de adopciones de mascotas",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./src/routers/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;