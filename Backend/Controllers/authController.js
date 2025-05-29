import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, findUserByEmail, comparePasswords } from "../services/authService.js";

dotenv.config();

export const signup = async (req, res) => {
	console.log("Signup request received:", req.body);
	const { name, email, password } = req.body;
	
	// Validate required fields
	if (!name || !email || !password) {
		console.log("Missing required fields", { name, email, password: !!password });
		return res.status(400).json({ error: "Nombre, email, y contraseña son requeridos" });
	}
	try {
		const existing = await findUserByEmail(email);
		if (existing) return res.status(400).json({ error: "Email en uso" });

		const user = await createUser({ name, email, password });
		res.status(201).json({ message: "Usuario creado creado", userId: user.id });
	} catch (error) {
		res.status(500).json({ error: "SignUp fallido" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await findUserByEmail(email);
		if (!user) return res.status(401).json({ error: "Credenciales Invalidas" });

		const isValid = await comparePasswords(password, user.password);
		if (!isValid) return res.status(401).json({ error: "Credenciales Invalidad" });

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
		res.status(200).json({token, user});
	} catch (error) {
		res.status(500).json({ error: "Login failed" });
	}
};
