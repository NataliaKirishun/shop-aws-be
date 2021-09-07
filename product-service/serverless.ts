import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  useDotenv: true,
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: '${file(./env.json):PG_HOST}',
      PG_PORT: '${file(./env.json):PG_PORT}',
      PG_DATABASE: '${file(./env.json):PG_DATABASE}',
      PG_USERNAME: '${file(./env.json):PG_USERNAME}',
      PG_PASSWORD: '${file(./env.json):PG_PASSWORD}'
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    getProductList: {
      handler: 'handler.getProductList',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true
          }
        }
      ]
    },
    getProductsById: {
      handler: "handler.getProductById",
      events: [
        {
          http: {
            method: 'get',
            path: '/products/{productId}',
            cors: true
          }
        }
      ]

    }
  },
};

module.exports = serverlessConfiguration;
