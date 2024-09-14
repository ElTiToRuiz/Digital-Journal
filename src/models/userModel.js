import { randomUUID } from "node:crypto"
import { Database } from "../service/connection.js"
import { createUserQuery, getUserQuery } from "../utils/query.js";

export class User{
    static conneccted = false
    static database = new Database()

    static async connect(){
        if (!this.connected){
            await this.database.connectToUser()
            this.connected = true
        }
    }

    static async getAll(){
        try{
            await User.connect()
            const query = 'SELECT * FROM users'
            const users = await this.database.executeQuery({query})
            return users.rows
        }catch(err){
            throw err
        }
    }

    static async getUser({email}){
        try{
            await User.connect()
            const query = getUserQuery({email})
            const user = await this.database.executeQuery({query})
            return user.rows ? user.rows[0] : null
        }catch(err){
            throw err
        }
    }

    static async createUser({username, email, hashedPassword}){
        try{
            await User.connect()
            const userId = randomUUID()
            const query = createUserQuery({userId, username, email, hashedPassword})
            await this.database.executeQuery({query})
        }catch(err){
            throw err
        }
    }
}