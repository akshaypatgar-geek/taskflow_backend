import 'dotenv/config';
declare const _default: (() => {
    port: string | number;
    jwt: {
        secret: string;
    };
    database: {
        url: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: string | number;
    jwt: {
        secret: string;
    };
    database: {
        url: string;
    };
}>;
export default _default;
