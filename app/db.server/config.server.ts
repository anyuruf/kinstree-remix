import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import schema from "./schema";

export function initializeDb (connectionString: string){
    const sql = postgres(connectionString)
    const db = drizzle(sql, {schema})
    return db
}