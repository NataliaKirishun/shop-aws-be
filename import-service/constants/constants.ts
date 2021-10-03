export const headers =  {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

export enum HTTP_STATUS_CODE {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    BAD_CREDENTIALS = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}