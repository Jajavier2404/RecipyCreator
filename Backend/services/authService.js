import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createUser = async ({ name, email, password }) => {
	console.log("Creating user with data:", { name, email, hasPassword: !!password });
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const user = await prisma.user.create({
			data: { name, email, password: hashedPassword },
		});
		console.log("Usuario creado con Exito:", { id: user.id, name: user.name });
		return user;
	} catch (error) {
		console.error("Error al crear el Usuario:", error);
		throw error;
	}
};

const findUserByEmail = (email) => {
	return prisma.user.findUnique({ where: { email } });
};

const comparePasswords = (inputPassword, hashedPassword) => {
	return bcrypt.compare(inputPassword, hashedPassword);
};

export { createUser, findUserByEmail, comparePasswords };