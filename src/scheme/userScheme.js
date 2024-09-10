import z from 'zod'

const userScheme = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(20, { message: 'Password must be no longer than 20 characters' })
        .refine(value => /[A-Z]/.test(value), {
            message: 'Password must include at least one uppercase letter',
        })
        .refine(value => /[a-z]/.test(value), {
            message: 'Password must include at least one lowercase letter',
        })
        .refine(value => /\d/.test(value), {
            message: 'Password must include at least one number',
        })
        .refine(value => /[@$!%*?&#]/.test(value), {
            message: 'Password must include at least one special character',
        }),
})

export function validateUser(input){
    return userScheme.safeParse(input)
}

export function validatePartialUser(input){
    return userScheme.partial().safeParse(input)
}

