import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    s3: {
      region: 'eu-west-1',
      bucket: 'import-products'
    },
    sqs: {
      arn: '${cf:product-service-${self:provider.stage}.QueueARN}',
      url: '${cf:product-service-${self:provider.stage}.QueueURL}'
    }
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
      REGION: '${env:REGION}',
      BUCKET: '${env:BUCKET}',
      PREFIX: '${env:PREFIX}',
      QUEUE_NAME: '${env:QUEUE_NAME}',
      SQS_URL: '${self:custom.sqs.url}'
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: 'arn:aws:s3:::${self:custom.s3.bucket}'
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: 'arn:aws:s3:::${self:custom.s3.bucket}/*'
      },
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: '${self:custom.sqs.arn}'
      }
    ],
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser }
};

module.exports = serverlessConfiguration;
