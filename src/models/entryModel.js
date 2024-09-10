import { getAllEntriesQuery } from "../utils/query"

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

    static async getOneEntry(){
        try{
            await Entry.connect()
            const query = getOneEntryQuery()
            const result = await this.database.executeQuery({query})
            return result.rows
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

    static async postEntry(data){
        try{
            await Entry.connect()
            const query = postEntryQuery({data})
            await this.database.executeQuery({query})
            return true
        }catch(err){
            throw err
        }
    }

    static async putEntry(data, {id}){
        try{
            await Entry.connect()
            const query = putEntryQuery({data, id})
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

