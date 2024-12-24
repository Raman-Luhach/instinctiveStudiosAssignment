const express = require("express");
const { connectDB, prisma } = require("./db/database");
const dotenv = require("dotenv");
const studentRoutes = require("./routes/students");
const cors = require('cors');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(express.json());

app.use("/", studentRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to the database:", err.message);
});
