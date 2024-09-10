import dotenv from "dotenv"
import { createClient } from '@libsql/client'

dotenv.config()

export class Database{

    constructor(){
        this.db = this.createDatabaseConnection();
    }
    
    createDatabaseConnection(){
        const db =  createClient({
            url: process.env.DB_URL,
            authToken: process.env.DB_TOKEN
        })
        return db
    }

    async executeQuery({query}){
        try{
            const result = await this.db.execute(query)
            return result
        }catch(err){
            console.error('Database query error:', err)
            throw err
        }
    }

    async connectToUser() {
        await this.db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                email TEXT PRIMARY KEY UNIQUE,
                password TEXT NOT NULL
            )    
        `);
    }
    
    async connectToEntry() {
        await this.db.execute(`
            CREATE TABLE IF NOT EXISTS entries (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                mood TEXT,
                tags TEXT 
            )   
        `);
    }
}

