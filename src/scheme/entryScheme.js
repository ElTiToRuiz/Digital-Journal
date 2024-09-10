import z from 'zod'

const entryScheme = z.object({
    title: z.string().min(1, { message: 'Title must not be empty' }),
    content: z.string().min(1, { message: 'Content must not be empty' }),
    mood: z.string().optional(),
    tags: z.string().optional(),
})

export function validateEntry(input){
    return entryScheme.safeParse(input)
}

export function validatePartialEntry(input){
    return entryScheme.partial().safeParse(input)
}