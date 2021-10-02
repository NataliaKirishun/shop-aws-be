import { SQSEvent, SQSHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as productService from "../services/product.service";

const { REGION, SNS_ARN } = process.env;

export const catalogBatchProcess: SQSHandler = async (event: SQSEvent): Promise<void> => {
    try {
        AWS.config.update({ region: REGION });
        const sns = new AWS.SNS();

        for (const record of event.Records) {
            const product = await productService.addProduct(JSON.parse(record.body));
            console.log(product, 'product');

            sns.publish({
                Subject: 'Adding a new product',
                Message: `Item was added: ${product}`,
                TopicArn: SNS_ARN
            }, () => {
                console.log('Send email');
            });
        }
    } catch (err) {
        console.log(err);
    }
}