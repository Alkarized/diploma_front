import React from 'react';
// @ts-ignore
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const swaggerData = {
    swagger: '2.0',
    info: {
        version: '1.0.0',
        title: 'Обновление цен через API',
        description: 'Документация обновления цен через API',
    },
    host: 'localhost:8080',
    basePath: '/api/price',
    paths: {
        'data/all': {
            post: {
                summary: 'Обновление цен на всех платформах',
                description: 'Обновить цены на всех включенных платформах',
                consumes: ['application/json'],
                parameters: [
                    {
                        name: 'data',
                        in: 'body',
                        description: 'Данные для обновления',
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
                                            title: { type: 'string', nullable: true},
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
        'data/avito': {
            post: {
                summary: 'Обновление цен Avito',
                description: 'Обновить цены только на платформе Avito',
                consumes: ['application/json'],
                parameters: [
                    {
                        name: 'data',
                        in: 'body',
                        description: 'Данные для обновления',
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
                                            title: { type: 'string', nullable: true},
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
        'data/vk': {
            post: {
                summary: 'Обновление цен VK',
                description: 'Обновить цены только на платформе VK',
                consumes: ['application/json'],
                parameters: [
                    {
                        name: 'data',
                        in: 'body',
                        description: 'Данные для обновления',
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
                                            title: { type: 'string', nullable: true},

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
        'data/ozon': {
            post: {
                summary: 'Обновление цен Ozon',
                description: 'Обновить цены только на платформе Ozon',
                consumes: ['application/json'],
                parameters: [
                    {
                        name: 'data',
                        in: 'body',
                        description: 'Данные для обновления',
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
                                            title: { type: 'string', nullable: true},
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
            in: 'Заголовок',
            description: 'Введите токен в формате "Bearer {token}"',
        },
    },
};

const SwaggerPanel = () => {
    return <SwaggerUI spec={swaggerData} supportedSubmitMethods={[]}/>;
};

export default SwaggerPanel;