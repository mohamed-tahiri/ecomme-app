import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger configuration
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'E-Commerce API',
        version: '1.0.0',
        description: 'API documentation for the e-commerce project',
    },
    servers: [
        {
            description: 'Local',
            url: `http://localhost:${process.env.PORT || 3000}`, // ✅ Corrected OR operator
        },
        {
            description: 'Development',
            url: process.env.DEV_URL || 'http://localhost:5001',
        },
        {
            description: 'Staging',
            url: process.env.STAGING_URL || 'http://staging.example.com',
        },
        {
            description: 'Production',
            url: process.env.PROD_URL || 'https://api.example.com',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
