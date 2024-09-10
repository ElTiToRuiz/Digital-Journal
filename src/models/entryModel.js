import { randomUUID } from "node:crypto"
import { deleteEntryQuery, getAllEntriesQuery, getOneEntryQuery, postEntryQuery, putEntryQuery, searchEntriesQuery } from "../utils/query.js"
import { Database } from "../service/connection.js"

export class Entry{

    static conneccted = false
    static database = new Database()

    static async connect(){
        if (!this.connected){
            await this.database.connectToEntry()
            this.connected = true
        }
    }

    static async getAllEntries(){
        try{
            await Entry.connect()
            const query = getAllEntriesQuery()
            const result = await this.database.executeQuery({query})
            return result.rows
        }catch(err){
            throw err
        }
    }

    static async getOneEntry({id}){
        try{
            await Entry.connect()
            const query = getOneEntryQuery({id})
            console.log(query)
            const result = await this.database.executeQuery({query})
            return result.rows[0]
        }catch(err){
            throw err
        }
    }

    static async searchEntries({filters}){
        try{
            await Entry.connect()
            const query = searchEntriesQuery({filters})
            const result = await this.database.executeQuery({query})
            return result.rows
        }catch(err){
            throw err
        }
    }

    static async postEntry({data}){
        try{
            await Entry.connect()
            const id = randomUUID()
            const date = Date.now()
            const query = postEntryQuery({id, date, data})
            await this.database.executeQuery({query})
            return true
        }catch(err){
            throw err
        }
    }

    static async putEntry({data, id}){
        try{
            await Entry.connect()
            console.log(data)
            const date = Date.now()
            const query = putEntryQuery({data, id, date})
            await this.database.executeQuery({query})
            return true
        }catch(err){
            throw err
        }
    }

    static async deleteEntry({id}){
        try{
            await Entry.connect()
            const query = deleteEntryQuery({id})
            await this.database.executeQuery({query})
            return true
        }catch(err){
            throw err
        }
    }
}

