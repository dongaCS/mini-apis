const express = require(`express`);
const mongoose = require("mongoose");
require("dotenv").config(); 

const app = express();

// schema for collection in db
const roastSchema = new mongoose.Schema(
    {
        joke: {
            type: String,
            require: true,
        }
    }
);
const Roast = mongoose.model("Roast", roastSchema)

// get request for random joke roast
app.get("/api/roast", async (req, res) => {
    try {
        let random = await Roast.aggregate().sample(1)
        res.json({status: 200, roast: random[0].roast});
    } catch (e) {
        res.json({status: 400, payload: "failure"})
    }
})

// launch app and connect to db
app.listen(process.env.PORT, () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(process.env.MONGODB_URI) // connects 
        .then(() => {
            console.log("MONGODB CONNECTED"); // when connected, let us know
        })
        .catch((e) => { // print error
            console.log(e);
        });
    console.log(`roast api listening to ${process.env.PORT}`)
})