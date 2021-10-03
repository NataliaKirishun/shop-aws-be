import * as AWSMock from 'aws-sdk-mock';
import { catalogBatchProcess } from '../handlers/catalogBatchProcess';
import { SQSRecord } from 'aws-lambda/trigger/sqs';
import { SQSEvent } from 'aws-lambda';

const mockProducts = [
    {
        count: 1,
        description: 'mock description 1',
        price: 10,
        title: 'mock title 1'
    },
    {
        count: 2,
        description: 'mock description 2',
        price: 10,
        title: 'mock title 2'
    }
];

jest.mock('../services/product.service');

const productService = jest.requireMock('../services/product.service');

describe('catalogBatchProcess method', () => {
    beforeEach(() => {
        process.env.SNS_ARN = "test";
    });

    afterEach(() => {
        jest.clearAllMocks();
        process.env.SNS_ARN = undefined;
    });

    it('should successfully add all products', async () => {
        const snsMockPublish = jest.fn(() => Promise.resolve());
        AWSMock.mock('SNS', 'publish', snsMockPublish);
        jest.spyOn(productService, 'addProduct').mockResolvedValue(mockProducts);

        await catalogBatchProcess({
            Records: [{ body: JSON.stringify(mockProducts) } as SQSRecord]
        }, {} as any, {} as any);

        expect(productService.addProduct).toHaveBeenCalledWith(mockProducts);
    });

    it('should fail due to parsing issue', async () => {
        await catalogBatchProcess(null as SQSEvent, {} as any, {} as any);

        expect(productService.addProduct).not.toHaveBeenCalled();
    });
});