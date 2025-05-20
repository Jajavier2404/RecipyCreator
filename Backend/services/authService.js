const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const createUser = async ({ name, email, password }) => {
	console.log("Creating user with data:", { name, email, hasPassword: !!password });
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const user = await prisma.user.create({
			data: { name, email, password: hashedPassword },
		});
		console.log("User created successfully:", { id: user.id, name: user.name });
		return user;
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
};

const findUserByEmail = (email) => {
	return prisma.user.findUnique({ where: { email } });
};

const comparePasswords = (inputPassword, hashedPassword) => {
	return bcrypt.compare(inputPassword, hashedPassword);
};

module.exports = {
	createUser,
	findUserByEmail,
	comparePasswords
};