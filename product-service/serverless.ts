import type { AWS } from '@serverless/typescript';
import {ProductScheme} from "./models/product.model";

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
      PG_HOST: '${env:PG_HOST}',
      PG_PORT: '${env:PG_PORT}',
      PG_DATABASE: '${env:PG_DATABASE}',
      PG_USERNAME: '${env:PG_USERNAME}',
      PG_PASSWORD: '${env:PG_PASSWORD}',
      REGION: '${env:REGION}',
      QUEUE_NAME: '${env:QUEUE_NAME}',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: '${env:QUEUE_NAME}'
        }
      }
    }
  },
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

    },
    addProduct: {
      handler: 'handler.addProduct',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
            cors: true,
            request: {
              schemas: {
                'application/json': {
                  schema: ProductScheme,
                  name: 'ProductModel',
                  description: 'body validation'
                }
              }
            }
          }
        }
      ]
    },
    catalogBatchProcess: {
      handler: 'handler.catalogBatchProcess',
      events: [
        {
          sqs: {
            batchSize: 5,
            arn: {
              'Fn::GetAtt': ['SQSQueue', 'Arn']
            }
          }
        }
      ]
    }
  },
};

module.exports = serverlessConfiguration;
