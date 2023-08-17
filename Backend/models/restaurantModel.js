
const { ObjectId } = require('mongodb');
const COLLECTION_NAME = "Restaurant";

class Restaurant {
    static async getRestaurants(db) {
        try {
            return await db.collection(COLLECTION_NAME).find({}).toArray();
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    static async addRestaurantOwner(db, newRestaurantOwner) {
        try {
            return await db.collection(COLLECTION_NAME).insertOne(newRestaurantOwner);
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    static async addNewFood(db, ownerId, newFood) {
        try {
            console.log(newFood)
            const result = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(ownerId) },
                // { $push: { foods: { _id: new ObjectId(), ...newFood } } }
                { $push: { foods: newFood } }
            )
            return result;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    static async editFood(db, ownerId, foodId, updatedFood) {
        try {
            const result = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(ownerId) },
                {
                    $set: {
                        "foods.$[f].name": updatedFood.name,
                        "foods.$[f].origin": updatedFood.origin,
                        "foods.$[f].price": updatedFood.price
                    }
                },
                // { arrayFilters: [{"f._id": new ObjectId(foodId)}] }
                { arrayFilters: [{ "f._id": foodId }] }
            )
            return result;

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async deleteFood(db, ownerId, foodId) {
        try {
            const result = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(ownerId) },
                // { $pull: {foods: {_id: new ObjectId(foodId)}}}
                { $pull: { foods: { _id: foodId } } }
            )
            return result;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    static async addNote(db, ownerId, newNote) {
        try {
            const result = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(ownerId) },
                { $push: { notes: newNote } }
            )
            return result;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    static async editNote(db, ownerId, noteId, updatedNote) {
        try {
            const result = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(ownerId) },
                {
                    $set:
                    {
                        "notes.$[n].header": updatedNote.header,
                        "notes.$[n].comment": updatedNote.comment,
                    }
                },
                { arrayFilters: [{ "n._id": noteId }] }
            )
            return result;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    static async deleteNote(db, ownerId, noteId) {
        try {
            const result = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(ownerId) },
                { $pull: { notes: { _id: noteId } } },
            )
            return result;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    static async editProfile(db, ownerId, updatedProfile) {
        try {
            const result = await db.collection(COLLECTION_NAME).updateOne(
                { _id: new ObjectId(ownerId) },
                {
                    $set: {
                        phoneNumber: updatedProfile.phoneNumber,
                        password: updatedProfile.password,
                        fullName: updatedProfile.fullName,
                        address: updatedProfile.address
                    }
                },
            )
            return result;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    static async deleteAccount (db, ownerId){
        try {
            const result = await db.collection(COLLECTION_NAME).deleteOne({_id: new ObjectId(ownerId)})
            return result;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
}

module.exports = Restaurant;