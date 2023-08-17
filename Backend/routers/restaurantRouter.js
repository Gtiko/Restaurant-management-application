const express = require("express");
const router = express.Router();
const restaurantControllers = require("../controllers/restaurantController");
const auth = require("../middleware/auth");

router.post("/login", auth.login);

router.get("/", restaurantControllers.getRestaurants)

router.post("/owners", auth.validateUserName, restaurantControllers.addRestaurantOwner);

router.patch("/owners/:ownerId/profile", restaurantControllers.editProfile);

router.put("/owners/:ownerId/foods", restaurantControllers.addNewFood);

router.patch("/owners/:ownerId/foods/:foodId", restaurantControllers.editFood);

router.delete("/owners/:ownerId/foods/:foodId", restaurantControllers.deleteFood);

router.put("/owners/:ownerId/notes", restaurantControllers.addNote);

router.patch("/owners/:ownerId/notes/:noteId", restaurantControllers.editNote);

router.delete("/owners/:ownerId/notes/:noteId", restaurantControllers.deleteNote);

router.delete("/owners/:ownerId/profile", restaurantControllers.deleteAccount);


module.exports = router;