import User from "../Model/User.js";
import registerUserSchema from "../validations/authValidation.js";
import bcrypt from "bcrypt";

const salt = 12;

class AuthController {
    static async showLogin(req, res) {
        res.render("authentication/login", { errors: [] });
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findByEmailOrUsername(email);
            if (!user) {
                return res.status(400).render("authentication/login", {
                    errors: ["Invalid email/username or password"]
                });
            }

            const isMatch = await User.comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(400).render("authentication/login", {
                    errors: ["Invalid email/username or password"]
                });
            }

            req.login(user, (err) => {
                if (err) {
                    console.error("Login error:", err);
                    return res.status(500).render("authentication/login", {
                        errors: ["An error occurred during login"]
                    });
                }
                return res.redirect("/");
            });
        } catch (err) {
            console.error("Login error:", err);
            return res.status(500).render("authentication/login", {
                errors: ["Internal server error. Please try again."]
            });
        }
    }

    static async showRegister(req, res) {
        // Render register page
        res.render("authentication/register", { errors: [] });
    }

    static async register(req, res) {
        const { error, value } = registerUserSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((e) => e.message);
            return res.status(400).render("authentication/register", { errors });
        }
        const { name, username, password, email } = value;
        const [existingEmail, existingUsername] = await Promise.all([
            User.findByEmail(email),
            User.findByUsername(username),
        ]);

        const errors = [];
        if (existingEmail) errors.push("Email already exists!");
        if (existingUsername) errors.push("Username already exists!");

        if (errors.length > 0) {
            return res.status(400).render("authentication/register", { errors });
        }
        try {
            const hashedPassword = await bcrypt.hash(password, salt);
            const result = await User.registerUser(name, email, username, hashedPassword);
            if (result.error) {
                return res.status(result.statusCode || 400).render("authentication/register", {
                    errors: [result.error],
                });
            }
            const newUser = result.user;
            req.login(newUser, (err) => {
                if (err) {
                    console.error("Login error after registration:", err);
                    return res.status(500).render("authentication/register", {
                        errors: ["An error occurred during login after registration"]
                    });
                }
                return res.redirect("/");
            });
        } catch (err) {
            console.error("Register error:", err.message);
            return res.status(500).render("authentication/register", {
                errors: ["Internal server error. Please try again."],
            });
        }
    }
}

export default AuthController;
