export function createUserQuery({ email, hashedPassword }) {
    return `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}')`;
}

export function getUserQuery({ email }) {
    return `SELECT * FROM users WHERE email = '${email}'`;
}