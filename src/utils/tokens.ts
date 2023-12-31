import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const privateKey = process.env.TOKEN_PRIVATE_KEY as string;
const publicKey = process.env.TOKEN_PUBLIC_KEY as string;
const tokenExpiry = process.env.TOKEN_EXPIRY_DATE as string;

export const createJwt = (
	payload: string | object | Buffer | undefined,
	option?: SignOptions
) => {
	const jwtPayload = payload || {};
	return jwt.sign(jwtPayload, privateKey, {
		...(option && option),
		expiresIn: tokenExpiry,
	});
};

export const verifyJwt = <T>(token: string): T | null => {
	try {
		return jwt.verify(token, publicKey) as T;
	} catch (err) {
		return null;
	}
};
