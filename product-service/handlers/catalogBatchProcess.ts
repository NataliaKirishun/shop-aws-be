import { SQSEvent, SQSHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as productService from "../services/product.service";

const { REGION } = process.env;

export const catalogBatchProcess: SQSHandler = async (event: SQSEvent): Promise<void> => {
    try {
        AWS.config.update({ region: REGION });

        for (const record of event.Records) {
            const product = await productService.addProduct(JSON.parse(record.body));
            console.log(product, 'product');
        }
    } catch (err) {
        console.log(err);
    }

}