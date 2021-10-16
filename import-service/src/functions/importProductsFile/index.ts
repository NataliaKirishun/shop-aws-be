import { handlerPath } from '@libs/handlerResolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'import',
                cors: true,
                authorizer: {
                    name: 'tokenAuthorizer',
                    arn: '${self:custom.basicAuthArn}',
                    resultTtlInSeconds: 0,
                    identitySource: 'method.request.header.Authorization',
                    type: 'TOKEN'
                },
                request: {
                    parameters: {
                        querystrings: {
                            name: true,
                        }
                    }
                }
            }
        }
    ]
}

