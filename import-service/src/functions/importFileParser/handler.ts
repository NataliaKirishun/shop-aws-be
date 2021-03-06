import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Context, S3Handler, S3Event } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { HTTP_STATUS_CODE } from '../../../constants/constants';
import * as csvParser from 'csv-parser';

const { REGION } = process.env;

const importFileParser: S3Handler = async (event: S3Event, _context: Context) => {
    try {

        const s3 = new S3({ region: REGION });

        for (const record of event.Records) {

            const { bucket, object } = record.s3;
            const filename = object.key;

            const params = {
                Bucket: bucket.name,
                Key: filename
            };

            const s3stream = s3.getObject(params).createReadStream();

            await new Promise<void>((resolve, reject) => {
                s3stream
                    .pipe(csvParser())
                    .on('data', (data) => {
                        console.log('[PARSED DATA]:', data);
                    })
                    .on('error', (err) => {
                        reject(err);
                    })
                    .on('end', async () => {
                        const newFileName = filename.slice(filename.indexOf('/') + 1);
                        await s3
                            .copyObject({
                                Bucket: bucket.name,
                                CopySource: `${bucket.name}/${filename}`,
                                Key: `parsed/${newFileName}`
                            })
                            .promise();

                        await s3
                            .deleteObject(params)
                            .promise();

                        resolve();
                    })
            });
        }
    } catch (e) {
        return formatJSONResponse({
            message: e.message
        }, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

export const main = middyfy(importFileParser);