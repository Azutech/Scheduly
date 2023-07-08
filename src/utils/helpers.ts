import bcrypt from 'bcrypt';

export const compareHash = async (
	string: string,
	hash: string
): Promise<boolean> => {
	return await bcrypt.compare(string, hash);
};

export const hashString = async (string: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(string, salt);
};
