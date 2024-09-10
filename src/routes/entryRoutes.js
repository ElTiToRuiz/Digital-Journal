import express from "express"
import { EntryController } from "../controllers/entryController.js"

export const entryRouter = express.Router()

entryRouter.get('/', EntryController.getAllEntries)

entryRouter.get('/search', EntryController.searchEntries)

entryRouter.post('/', EntryController.postEntry)

entryRouter.put('/:id', EntryController.putEntry)

entryRouter.patch('/:id', EntryController.putEntry)

entryRouter.delete('/:id', EntryController.deleteEntry)