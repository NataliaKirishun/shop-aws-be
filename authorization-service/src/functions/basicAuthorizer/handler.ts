import 'source-map-support/register';

import { middyfy } from '@libs/lambda';

import {APIGatewayAuthorizerHandler, APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent} from 'aws-lambda';

const basicAuthorizer: APIGatewayAuthorizerHandler = async (
    event: APIGatewayTokenAuthorizerEvent,
    _context,
    cb
) => {
    console.log("Event: ", JSON.stringify(event));

    if (event.type != 'TOKEN') {
        cb('Unauthorized');
    }

    try {
        const authorizationToken = event.authorizationToken;
        const encodedCreds = authorizationToken.split(' ')[1];
        const buff = Buffer.from(encodedCreds, 'base64');
        const plainCreds = buff.toString('utf-8').split(':');
        const [username, password] = plainCreds;

        console.log(`username: ${username} and password: ${password}`);

        const storedUserPassword = process.env[username];
        const effect =
            !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
        const policy: APIGatewayAuthorizerResult = generatePolicy(
            encodedCreds,
            event.methodArn,
            effect
        );
        cb(null, policy)
    } catch (error) {
        cb(`Unauthorized: ${error.message}`);
    }

}

function generatePolicy(
    principalId: string,
    resource,
    effect = 'Deny'
): APIGatewayAuthorizerResult {
    return {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
    };


export const main = middyfy(basicAuthorizer);
