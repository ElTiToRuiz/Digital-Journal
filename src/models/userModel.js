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

    static async createUser({email, hashedPassword}){
        try{
            await User.connect()
            const query = createUserQuery({email, hashedPassword})
            await this.database.executeQuery({query})
        }catch(err){
            throw err
        }
    }
}