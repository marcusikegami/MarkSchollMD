import jwt from 'jsonwebtoken';

const secret = 'MdSchollAdmin';
const expiration = '2h';

const signToken = function({ admin }) {
    const payload = { admin };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export default signToken;