import Auth from "../Model/Auth.js";

class AuthController {
    static async showLogin(req, res) {
        res.render("authentication/login", { errors: [] });
    }

    static async login(req, res) {
        // TODO: Implement login logic
        res.send("Login logic not implemented yet");
    }

    static async showRegister(req, res) {
        // Render register page
        res.render("authentication/register", { errors: [] });
    }

    static async register(req, res) {
        // TODO: Implement registration logic
        res.send("Register logic not implemented yet");
    }
}

export default AuthController;
