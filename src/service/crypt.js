import bcrypt from 'bcrypt'

export const cryptPassword = async ({password})=>{
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

export const comparePassword = async ({password, hashedPassword}) =>{
    const result = await bcrypt.compare(password, hashedPassword)
    console.log(result)
    return result
}