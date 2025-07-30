import { config } from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

config()
config({ path: join(process.cwd(), ".env") })
// migration configs
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

let dataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    password: DB_PASSWORD,
    username: DB_USERNAME,
    database: DB_NAME,
    port: +"5432",
    synchronize: false,
    entities: [
        "dist/**/**/**/*.entity{.ts,.js}",
        "dist/**/**/*.entity{.ts,.js}"
    ],
    migrations: [
        "src/migrations/*{.ts, .js}"
    ],
    migrationsTableName: "virgool_migration_db"
});


export default dataSource;