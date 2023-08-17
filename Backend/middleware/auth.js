const restaurantModels = require("../models/restaurantModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const PRIVATE_KEY = "Mesiye";

exports.login = async (req, res, next) => {
    try {
        const data = await restaurantModels.getRestaurants(req.db);
        const { username, password } = req.body;
        const item = data.find((x) => x.username == username);
        if (!item) {
            return  res.send({ success: false, data: "Invalid username" });
        }
        if (!bcrypt.compareSync(password, item.password)) {
            return  res.send({ success: false, data: "Invalid username" });
        }
        const token = jwt.sign(
            {
                username: item.username,
                address: item.address,
                phone: item.phoneNumber,
            },
            PRIVATE_KEY
        );
        res.send({ success: true, data: token });
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
};

exports.validateUserName = async (req, res, next) =>{
    try {
        const {username} = req.body;
        const data = await restaurantModels.getRestaurants(req.db);
        const findUser = data.find(user => user.username === username);
        if(!findUser){
            next();
        }else{
            return res.send({ success: false, data: { message: "UserExist" } });
        }
    } catch (error) {
        return res.send({ success: false, data: { message: "error..." } });
    }
}
