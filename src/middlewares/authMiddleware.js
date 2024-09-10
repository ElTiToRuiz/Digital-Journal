// NOT ADDED YET 

export const authMiddleware = (req, res, next) => {
    const token = req.params.token
    const result = validateToken(token)
    if (result) next()
    res.redirect('/login');
};