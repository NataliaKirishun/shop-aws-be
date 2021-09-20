import { importProductsFile } from "../src/functions/importProductsFile/handler";
import * as AWS from 'aws-sdk-mock';

const { BUCKET, PREFIX } = process.env;

describe('importProductsFile', () => {

    it('should return 400 if name is not passed in query params', async () => {
        const response = await importProductsFile({} as any);
        expect(response.statusCode).toBe(400);
    });

    it('should return 200 and call getSignedUrlPromise with appropriate params', async () => {
        const mockName = 'test.csv'

        AWS.mock('S3', 'getSignedUrlPromise', (method, params) => {
            expect(method).toEqual('putObject');
            expect(params).toEqual({
                Bucket: BUCKET,
                Key: `${PREFIX}/${mockName}`,
                Expires: 60,
                ContentType: "text/csv"
            });
        });

        const response = await importProductsFile(
            {
                queryStringParameters: {
                    name: mockName,
                },
            } as any
        );

        expect(response.statusCode).toBe(200);
    });

    it('should return 500 if something goes wrong', async () => {
        AWS.mock('S3', 'getSignedUrlPromise', () => {
            throw new Error('error');
        })
        const response = await importProductsFile(
            {
                queryStringParameters: {
                    name: 'test',
                },
            } as any
        );

        expect(response.statusCode).toBe(500);
    });
})