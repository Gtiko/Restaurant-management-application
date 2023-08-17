const restaurantModels = require("../models/restaurantModel");
const bcrypt = require("bcrypt");

exports.getRestaurants = async (req, res) => {
    try {
        const result = await restaurantModels.getRestaurants(req.db);
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
};

exports.addRestaurantOwner = async (req, res) => {
    try {
        const { password } = req.body;
        const hashed = bcrypt.hashSync(password, 7)
        const newRestaurantOwner = req.body;
        newRestaurantOwner.password = hashed;
        await restaurantModels.addRestaurantOwner(req.db, newRestaurantOwner);
        return res.send({ success: true, data: { message: "added" } });
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

exports.addNewFood = async (req, res) => {
    try {
        const newFood = req.body;
        const { ownerId } = req.params;
        const result = await restaurantModels.addNewFood(req.db, ownerId, newFood);
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

exports.editFood = async (req, res) => {
    try {
        const { ownerId, foodId } = req.params;
        const updatedFood = req.body;
        const result = await restaurantModels.editFood(req.db, ownerId, foodId, updatedFood);
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

exports.deleteFood = async (req, res) => {
    try {
        const { ownerId, foodId } = req.params;
        const result = await restaurantModels.deleteFood(req.db, ownerId, foodId);
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

exports.addNote = async (req, res) => {
    try {
        const { ownerId } = req.params;
        const newNote = req.body;
        const result = await restaurantModels.addNote(req.db, ownerId, newNote);
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

exports.editNote = async (req, res) => {
    try {
        const { ownerId, noteId } = req.params;
        const updatedNote = req.body;
        const result = await restaurantModels.editNote(req.db, ownerId, noteId, updatedNote);
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const { ownerId, noteId } = req.params;
        const result = await restaurantModels.deleteNote(req.db, ownerId, noteId);
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

exports.editProfile = async (req, res) => {
    try {
        const { ownerId } = req.params;
        const updatedProfile = req.body;
        const result = await restaurantModels.editProfile(req.db, ownerId, updatedProfile);
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const { ownerId } = req.params;
        const result = await restaurantModels.deleteAccount(req.db, ownerId);
        res.send(result);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

