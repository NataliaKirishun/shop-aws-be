import { SQSEvent, SQSHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const { REGION } = process.env;

export const catalogBatchProcess: SQSHandler = async (event: SQSEvent): Promise<void> => {
    AWS.config.update({ region: REGION });
    const products = event.Records.map(({ body }) => body);

    console.log(products);
}