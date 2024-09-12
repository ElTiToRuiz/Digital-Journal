import { Entry } from "../models/entryModel.js"
import { validateEntry, validatePartialEntry } from "../scheme/entryScheme.js";

export class EntryController{
    static async getAllEntries(req, res){
        try{
            const entries = await Entry.getAllEntries()
            if(entries.length === 0) return res.json({ message: "No entries found" });
            return res.json(entries)
        }catch(err){
            console.error(err)
            res.status(500).send('Internal server error')
        }
    }

    static async searchEntries(req, res){
        try{
            const filters = req.query
            const entries = await Entry.searchEntries({filters})
            if(entries.length === 0) return res.json({ message: "No entries found" });
            return res.json(entries)
        }catch(err){
            console.error(err)
            res.status(500).send('Internal server error')
        }
    }

    static async postEntry(req, res){
        try{
            const data = req.body
            const validate = validateEntry(data)
            if(validate.error) return res.status(400).send(validate.error) 
            await Entry.postEntry({data})
            res.json({ message: 'Journal file saved successfully' });
        }catch(err){
            console.error(err)
            res.status(500).send('Error posting entry')
        }
    }

    static async putEntry(req, res){
        try{
            const id = req.params.id
            const result = await EntryController.checkEntryExist({id})
            if(!result) return res.status(404).send('Entry not found')
            const data = req.body
            const validate = validatePartialEntry(data)
            if(validate.error) return res.status(400).send(validate.error)
            await Entry.putEntry({data, id})
            res.json({message: 'Journal file successfully updated'});
        }catch(err){
            console.error(err)
            res.status(500).send('Error putting entry')
        }
    }

    static async deleteEntry(req, res){
        try{
            const id = req.params.id
            const result = await EntryController.checkEntryExist({id})
            if(!result) return res.status(404).send('Entry not found')
            await Entry.deleteEntry({id})
            res.json({message: 'Journal file succesfully delted'})
        }catch(err){
            console.error(err)
            res.status(500).send('Error deleting entry')
        }
    }

    static async checkEntryExist({id}){
        try{
            const entry = await Entry.getOneEntry({id})
            return entry === undefined ? false : true
        }catch(err){
            console.error(err)
            throw err
        }
    }
}