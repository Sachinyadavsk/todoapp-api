const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./database/db");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/api/tasks", require("./routes/task.routes"));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});