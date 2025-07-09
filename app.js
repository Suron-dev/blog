import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import articleRoutes from "./routes/articleRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up view engine
app.set("view engine", "ejs");


// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));



app.use("/articles" , articleRoutes);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/article", (req, res) => {
    res.render("articles/article");
});

app.get("/articles/create", (req, res) => {
    res.render("articles/create");
});



app.post("/articles/create", (req, res) => {
    // Handle article creation here
    console.log("New article data:", req.body);
    // You can add database logic here
    res.redirect("/article");
});

app.get("/articles/:id", (req, res) => {
    // Mock article data - replace with database query
    const article = {
        id: req.params.id,
        title: "The Future of Web Development: Beyond React and Vue",
        excerpt:
            "Explore the cutting-edge frameworks and technologies that are reshaping how we build modern web applications. From micro-frontends to edge computing, discover what's coming next in the world of frontend development.",
        content: `
            <h2>Introduction</h2>
            <p>The landscape of web development is constantly evolving, with new frameworks and technologies emerging at an unprecedented pace. While React and Vue have dominated the frontend ecosystem for years, we're now seeing a new wave of innovative solutions that promise to revolutionize how we build web applications.</p>
            
            <h2>The Rise of Micro-Frontends</h2>
            <p>Micro-frontends represent a paradigm shift in how we think about frontend architecture. Instead of building monolithic applications, teams can now work on independent, deployable frontend modules that can be composed together at runtime.</p>
            
            <blockquote>
                "Micro-frontends enable teams to work independently, deploy frequently, and scale their development efforts effectively."
            </blockquote>
            
            <h2>Edge Computing and Performance</h2>
            <p>Edge computing is transforming how we deliver web applications. By moving computation closer to users, we can achieve:</p>
            <ul>
                <li>Faster response times</li>
                <li>Reduced latency</li>
                <li>Better user experience</li>
                <li>Improved scalability</li>
            </ul>
            
            <h2>Modern Frameworks to Watch</h2>
            <p>Several new frameworks are gaining traction in the developer community:</p>
            
            <h3>1. Svelte</h3>
            <p>Svelte takes a different approach by moving the framework logic into a compile step, resulting in smaller bundle sizes and better performance.</p>
            
            <h3>2. Solid.js</h3>
            <p>Solid.js offers React-like syntax with better performance characteristics and a smaller footprint.</p>
            
            <h3>3. Qwik</h3>
            <p>Qwik focuses on instant loading by deferring JavaScript execution until it's actually needed.</p>
            
            <h2>Conclusion</h2>
            <p>The future of web development is exciting and full of possibilities. While React and Vue will continue to be important tools in our arsenal, embracing new technologies and architectural patterns will be crucial for staying competitive in this rapidly evolving landscape.</p>
        `,
        category: "Technology",
        author: "Sarah Chen",
        date: "March 22, 2024",
        readTime: 8,
        tags: ["web development", "frontend", "frameworks", "technology"],
    };

    res.render("articles/show", { article });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
