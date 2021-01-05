import * as path from 'path';
import { filesystem } from 'gluegun'

export class ApiPgPaths {
    static rel_apiRootDirectory = ( append: string ) => `apis/${append}`;
    static rel_apiSchema = ( api: string ) => pathJoin(ApiPgPaths.rel_apiRootDirectory(api), 'src', 'api', '.generated', 'schema', 'api.graphql' );
    static rel_dbSchema = ( api: string ) => pathJoin(ApiPgPaths.rel_apiRootDirectory(api), 'src', 'db', '.generated', 'schema', 'db.graphql' );

    static abs_src = ( append?: string ) => pathJoin(filesystem.cwd(), 'src', append );

    static abs_api = ( append?: string ) => pathJoin(ApiPgPaths.abs_src(), 'api', append );
    static abs_api_queries = ( append?: string ) => pathJoin(ApiPgPaths.abs_api(), 'queries', append );
    static abs_api_commands = ( append?: string ) => pathJoin(ApiPgPaths.abs_api(), 'commands', append );
    static abs_api_generated = ( append?: string ) => pathJoin(ApiPgPaths.abs_api(), '.generated', append );
    static abs_api_generated_buildSchema = ( append?: string ) => pathJoin(ApiPgPaths.abs_api_generated(), 'buildSchema', append );

    static abs_db = ( append?: string ) => pathJoin(ApiPgPaths.abs_src(), 'db', append );
    static abs_db_queries = ( append?: string ) => pathJoin(ApiPgPaths.abs_db(), 'queries', append );
    static abs_db_mutations = ( append?: string ) => pathJoin(ApiPgPaths.abs_db(), 'mutations', append );
    static abs_db_generated = ( append?: string ) => pathJoin(ApiPgPaths.abs_db(), '.generated', append );
    static abs_db_generatedQueries = ( append?: string ) => pathJoin(ApiPgPaths.abs_db_generated(), 'queries', append );
    static abs_db_generatedMutations = ( append?: string ) => pathJoin(ApiPgPaths.abs_db_generated(), 'mutations', append );
}


const pathJoin = (...params): string => {
    const filteredParams: Array<string> = params.filter( param => param !== undefined );
    return path.join( ...filteredParams );
}