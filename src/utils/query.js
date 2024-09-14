const ALLOWED_KEYS = ['title', 'date', 'datea', 'dateb', 'content', 'mood', 'tags']

export function createUserQuery({userId, username, email, hashedPassword }){
    return `INSERT INTO users (id, username, email, password) VALUES ('${userId}', '${username}', '${email}', '${hashedPassword}')`
}

export function getUserQuery({ email }) {
    return `SELECT * FROM users WHERE email='${email}'`
}

export function getAllEntriesQuery(){
    return `SELECT * FROM entries`
}

export function getOneEntryQuery({id}){
    return `SELECT * FROM entries WHERE id='${id}'`
}

export function searchEntriesQuery({ filters }) {
    let query = "SELECT * FROM entries WHERE ";
    for (const key in filters) {
        if (ALLOWED_KEYS.includes(key)) {
            console.log(key, filters[key])
            query += getFilter(key, filters[key])
        }
    }
    query = query.slice(0, -5);
    return query;
}

export function postEntryQuery({id, data, date}){
    const mood = data.mood ? `'${data.mood}'` : 'NULL'
    const tags = data.tags ? `'${data.tags}'` : 'NULL'
    return `INSERT INTO entries (id, title, content, date, mood, tags) VALUES ('${id}', '${data.title}', '${data.content}', '${date}', ${mood}, ${tags})`
}

export function putEntryQuery({id, data, date}){
    const title = data.title ? ` title='${data.title}'` : false
    const content = data.content ? ` content='${data.content}'` : false
    const mood = data.mood ? ` mood='${data.mood}'` : false
    const tags = data.tags ? ` tags='${data.tags}'` : false
    let query = `UPDATE entries SET`
    if (title) query += `${title},`
    if (content) query += `${content},`
    if (mood) query += `${mood},`
    if (tags) query += `${tags},`
    query += ` date = ${date} WHERE id='${id}'`
    return query
}

export function deleteEntryQuery({id}){
    return `DELETE FROM entries WHERE id = '${id}'`
}


const getFilter = (key, value) => {
    switch (key) {
        case 'title':
            return `LOWER(title) LIKE '%${value.toLowerCase()}%' AND `
        case 'date':
            return `date = '${value}' AND `
        case 'datea':
            return `date >= '${value}' AND `
        case 'dateb':
            return `date <= '${value}' AND `
        case 'content':
            return `LOWER(content) LIKE '%${value.toLowerCase()}%' AND `
        case 'mood':
            return `LOWER(mood) LIKE '%${value.toLowerCase()}%' AND `
        case 'tags':
            return `LOWER(tags) LIKE '%${value.toLowerCase()}%' AND `
        default:
            return ''
    }
}
