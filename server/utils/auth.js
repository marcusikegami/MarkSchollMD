import jwt from 'jsonwebtoken';

const secret = 'MdSchollAdmin';
const expiration = '2h';


    const authMiddleware = function({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token
            .split(' ')
            .pop()
            .trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.admin = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    }
    
    export default authMiddleware;