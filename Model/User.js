//user model
import db from "../config/db.js";
import bcrypt from "bcrypt";
class User {
    static async findById(id) {
        if (isNaN(id) || !id) throw new Error("Invalid ID");
        const query = "SELECT * FROM \"user\" WHERE id = $1";
        try {
            const { rows } = await db.query(query, [id]);
            if (!rows[0]) return null;
            return rows[0];
        } catch (error) {
            throw new Error("Database error in findById");
        }
    }
    static async findByEmail(email) {
        if (!email || typeof email !== "string") return { error: "Invalid email", statusCode: 400 };

        const query = `SELECT * FROM "user" WHERE email = $1`;
        try {
            const { rows } = await db.query(query, [email]);
            if (!rows[0]) return null;
            return rows[0];
        } catch (error) {
            throw new Error("Database error in findByEmail");
        }
    }

    static async findByUsername(username) {
        if (!username || typeof username !== "string") return { error: "Invalid username", statusCode: 400 };

        const query = `SELECT * FROM "user" WHERE user_name = $1`;
        try {
            const { rows } = await db.query(query, [username]);
            if (!rows[0]) return null;
            return rows[0];
        } catch (error) {
            throw new Error("Database error in findByUsername");
        }
    }

    static async findByEmailOrUsername(identifier) {
        const query = `
        SELECT * FROM "user"
        WHERE email = $1 OR user_name = $1
        LIMIT 1
    `;
        try {
            const { rows } = await db.query(query, [identifier]);
            if (!rows[0]) return null;
            return rows[0] || null;
        } catch (err) {
            throw new Error("Database error in findByEmailOrUsername");
        }
    }

    static async comparePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    static async registerUser(name, email, username, password) {
        if (!email || email === "" || !password || password === "" || !username || username === "") {
            return { error: "all user data required", statusCode: 400 };
        }
        const query =
            'INSERT INTO "user" (name , email , user_name , password) VALUES ($1 , $2 , $3 , $4) RETURNING *';
        try {
            const { rows } = await db.query(query, [name, email, username, password]);
            if (!rows[0] || rows[0] === "") return { error: "error retrieving new user", statusCode: 400 };
            return { message: "user created successfully ", user: rows[0], statusCode: 200 };
        } catch (error) {
            return { error: error.message };
        }
    }

    // static async loginUser(credentials) {
    //     return { message: "loginUser not implemented" };
    // }
}

export default User;
