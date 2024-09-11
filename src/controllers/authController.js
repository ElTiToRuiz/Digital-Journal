import jwt from "jsonwebtoken"
import { User } from "../models/userModel.js"
import { validateUser } from "../scheme/userScheme.js"
import { comparePassword, cryptPassword } from "../service/crypt.js"
import { getJWT_TOKEN } from "../service/connection.js"

const JWT_KEY = getJWT_TOKEN()
export class AuthController{
    static async getAll(req, res){
        try{
            const users = await User.getAll()
            return res.json(users)
        }catch(err){
            return res.status(500).json({message: 'Internal server Error'})
        }
    }

    static async login(req, res){
        try{
            const {email, password} = req.body
            const user = await User.getUser({email})
            if (!user) return res.status(400).json({message: 'User not found', user: false})
            const hashedPassword = user.password
            const result = await comparePassword({password, hashedPassword})
            if (!result) return res.status(400).json({message: 'Invalid password', user: false})
            const token = jwt.sign(user, JWT_KEY, {expiresIn: '24h'})
            return res.json({message: 'Logged in', token: token})
        }catch(err){
            console.log(err)
            return res.status(500).json({message: 'Internal server Error'})
        }
    }

    static async register(req, res){
        try{
            const {email, password} = req.body
            const result = await AuthController.checkUser({email})
            if (result) return res.status(400).json({message: 'User already exists'})
            const validation = validateUser({email, password})
            if (validation.error) return res.status(400).json({message: 'Invalid input', error: validation.error})
            const hashedPassword = await cryptPassword({password})
            await User.createUser({email, hashedPassword})
            const user = {email, hashedPassword}
            const token = jwt.sign(user, JWT_KEY, {expiresIn: '24h'})
            return res.json({message: 'User created', token: token})
        }catch(err){
            console.log(err)
            return res.status(500).json({message: 'Internal server Error'})
        }
    }

    static async checkUser({email}){
        try{
            const user = await User.getUser({email})
            return user ? true : false
        }catch(err){
            return false
        }
    }
}