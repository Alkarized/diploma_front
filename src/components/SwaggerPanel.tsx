import React from 'react';
// @ts-ignore
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const swaggerData = {
    swagger: '2.0',
    info: {
        version: '1.0.0',
        title: 'API Documentation',
        description: 'Documentation for API endpoints',
    },
    host: 'localhost:8080',
    basePath: '/api',
    paths: {
        '/update/price/all': {
            post: {
                summary: 'Update prices for all platforms',
                description: 'Updates prices for all platforms',
                consumes: ['application/json'],
                parameters: [
                    {
                        name: 'data',
                        in: 'body',
                        description: 'Data for updating prices',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            price: { type: 'number' },
                                            article: { type: 'string' },
                                            code: { type: 'string', nullable: true },
                                            company: { type: 'string', nullable: true },
                                        },
                                        required: ['price', 'article'],
                                    },
                                },
                            },
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Success',
                    },
                },
                security: [{BearerAuth: []}],
            },
        },
        '/update/price/avito': {
            post: {
                summary: 'Update prices for Avito',
                description: 'Updates prices for Avito platform',
                consumes: ['application/json'],
                parameters: [
                    {
                        name: 'data',
                        in: 'body',
                        description: 'Data for updating prices',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            price: { type: 'number' },
                                            article: { type: 'string' },
                                            code: { type: 'string', nullable: true },
                                            company: { type: 'string', nullable: true },
                                        },
                                        required: ['price', 'article'],
                                    },
                                },
                            },
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Success',
                    },
                },
                security: [{BearerAuth: []}],
            },
        },
        // Добавьте описания для остальных методов аналогично
    },
    securityDefinitions: {
        BearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Enter your Bearer token in the format "Bearer {token}"',
        },
    },
};

const SwaggerPanel = () => {
    return <SwaggerUI spec={swaggerData} supportedSubmitMethods={[]}/>;
};

export default SwaggerPanel;