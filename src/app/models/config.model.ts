export class ConfigParams {
    public static windowLocationHostname = (typeof window !== 'undefined') && window.location ? window.location.hostname : '';
    public static ENV_LOCAL = ((ConfigParams.windowLocationHostname === 'localhost') || (ConfigParams.windowLocationHostname === '127.0.0.1'));
    public static API = {
        baseURL: ConfigParams.ENV_LOCAL ? 'http://localhost:3000/' : 'prodURL',
    };
}
