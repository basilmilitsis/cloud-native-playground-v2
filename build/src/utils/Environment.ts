export class Environment {

    static DB_HOST: string = process.env.SHARED_POSTGRES_HOST ? process.env.SHARED_POSTGRES_HOST : '0.0.0.0';
    static DB_PORT: number = process.env.SHARED_POSTGRES_PORT ? Number.parseInt(process.env.SHARED_POSTGRES_PORT) : 5432;
    static DB_USER: string = process.env.SHARED_POSTGRES_USER ? process.env.SHARED_POSTGRES_USER : 'shared-dev-user';
    static DB_PASSWORD: string = process.env.SHARED_POSTGRES_PASSWORD ? process.env.SHARED_POSTGRES_PASSWORD : 'shared-dev-password';
    static DB_NAMES: string[] = process.env.SHARED_POSTGRES_DB_NAMES ? process.env.SHARED_POSTGRES_DB_NAMES.split(',') : ['search'];
    
    static SEARCH_DB_NAME: string = process.env.SEARCH_DB_NAME ? process.env.SEARCH_DB_NAME : 'search';
    static SEARCH_API_PORT: number = process.env.SEARCH_API_PORT ? Number.parseInt(process.env.SEARCH_API_PORT) : 8080;
}