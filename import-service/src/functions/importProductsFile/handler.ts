import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { HTTP_STATUS_CODE } from "../../../constants/constants";

const REGION = 'eu-west-1';
const BUCKET = 'import-products';
const PREFIX = 'uploaded';


const importProductsFile: APIGatewayProxyHandler = async (event) => {

    try {
        const name = event.queryStringParameters?.name;

        if (!name) {
            return formatJSONResponse({
                message: 'Query parameter name is required'
            }, HTTP_STATUS_CODE.BAD_REQUEST);
        }

        const s3 = new S3({ region: REGION });

        const signedURL = await s3.getSignedUrlPromise(
            "putObject", {
                Bucket: BUCKET,
                Key: `${PREFIX}/${name}`,
                Expires: 60,
                ContentType: "text/csv"
            }
        )

        return formatJSONResponse(signedURL, HTTP_STATUS_CODE.OK);
    } catch (e) {
        return formatJSONResponse({
            message: e.message
        }, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

export const main = middyfy(importProductsFile);