// passport
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../Model/User.js";

// LocalStrategy config
passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    async (username, password, done) => {
        try {
            const user = await User.findByEmailOrUsername(username);
            if (!user) return done(null, false, { message: "User not found" });

            const isMatch = await User.comparePassword(password, user.password);
            if (!isMatch) return done(null, false, { message: "Incorrect password" });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Session serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) return done(null, false);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;
