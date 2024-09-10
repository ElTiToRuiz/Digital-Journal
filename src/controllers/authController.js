import { User } from "../models/userModel.js"
import { validateUser } from "../scheme/userScheme.js"
import { comparePassword, cryptPassword } from "../service/crypt.js"


export class AuthController{
    static async login(req, res){
        try{
            const {email, password} = req.body
            const user = await User.getUser({email})
            if (!user) return res.status(400).json({message: 'User not found', user: false})
            const hashedPassword = user.password
            const result = await comparePassword({password, hashedPassword})
            if (!result) return res.status(400).json({message: 'Invalid password', user: false})
            return res.json({message: 'Logged in', user: user})
        }catch(err){
            return res.status(500).json({message: 'Internal server Error'})
        }
    }

    static async register(req, res){
        try{
            const {email, password} = req.body
            const result = await AuthController.checkUser({email})
            if (result) return res.status(400).json({message: 'User already exists'})
            const validation = validateUser({email, password})
            if (!validation.success) return res.status(400).json({message: 'Invalid input', error: validation.error})
            const hashedPassword = await cryptPassword({password})
            await User.createUser({email, hashedPassword})
            return res.json({message: 'User created'})
        }catch(err){
            return res.status(500).json({message: 'Internal server Error'})
        }
    }

    static async checkUser({email}){
        try{
            const user = User.getUser({email})
            return user ? true : false
        }catch(err){
            return false
        }
    }
}