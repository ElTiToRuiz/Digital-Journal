import { Entry } from "../models/entryModel.js"

export class EntryController{
    static getAllEntries(req, res){
        Entry.getAllEntries()
        res.send('Entries')
    }

    static searchEntries(req, res){
        Entry.searchEntries()
        res.send('Search')
    }

    static postEntry(req, res){
        Entry.postEntry()
        res.send('Posted')
    }

    static putEntry(req, res){
        Entry.putEntry()
        res.send('Putted')
    }

    static deleteEntry(req, res){
        Entry.deleteEntry()
        res.send('Deleted')
    }

    static patchEntry(req, res){
        Entry.patchEntry()
        res.send('Patched')
    }
}