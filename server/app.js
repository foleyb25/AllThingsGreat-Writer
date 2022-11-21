require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { application } = require('express');

const app = express();
const port = process.env.PORT ? process.env.PORT : 5002
const db_uri = process.env.DB_URI ? process.env.DB_URI : ""

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("./uploads"));

// database connection
mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to the database!"))
.catch((err) => console.log(err))
//Routes prefix
app.use('', require("./src/routes/blogs.route"));
app.use('', require("./src/routes/comments.route"));
app.use('', require("./src/routes/screenplayreviews.route"));
app.use('', require("./src/routes/screenplays.route"));
app.use('', require("./src/routes/users.route"));
app.use('', require("./src/routes/watchservice.route"));
app.use('', require("./src/routes/writers.route"));

app.listen(port, () => console.log(`server is running at http://localhost:${port}`));