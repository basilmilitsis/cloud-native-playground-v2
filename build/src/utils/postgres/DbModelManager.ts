import { Environment } from '../Environment';

import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

export class DbModelManager {
    async syncModels(dbName: string, buildDir: string) {
        const connection = await createConnection({
            type: 'postgres',
            host: Environment.DB_HOST,
            port: Environment.DB_PORT,
            username: Environment.DB_USER,
            password: Environment.DB_PASSWORD,
            database: dbName,
            schema: 'public',
            namingStrategy: new SnakeNamingStrategy(),
            entities: [path.join(buildDir, '*.js')],
        });
        await connection.synchronize(false);
        await connection.close();
    }
}