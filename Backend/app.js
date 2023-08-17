const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();

const restaurantRouters = require("./routers/restaurantRouter");


app.use(express.json());
app.use(cors());

app.listen(8080, () => { console.log("connected on 8080...") });

let db = null;
async function connectDB() {
    try {
        const uri =
            "mongodb+srv://user:root@cluster0.jxhwpwk.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db("RestaurantManagement");
        console.log("DB connected...");
    } catch (error) {
        console.log("DB connection error...");
    }
}
connectDB();

app.use((req, res, next)=>{
    req.db = db;
    next();
});

app.use("/restaurants", restaurantRouters);



app.use((req, res) => {
    res.send("API not supported")
});

app.use((error, req, res) => {
    if (error && error.message) {
        res.send(error.message)
    } else {
        res.send("Backend error...");
    }
})