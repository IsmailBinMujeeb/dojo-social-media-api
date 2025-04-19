import jwt from 'jsonwebtoken';

export default function (data){

    const ACCESS_TOKEN = jwt.sign({ id: data._id, userhandle: data.userhandle }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
    const REFRESH_TOKEN = jwt.sign({ id: data._id, userhandle: data.userhandle }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });

    return { ACCESS_TOKEN, REFRESH_TOKEN };
}