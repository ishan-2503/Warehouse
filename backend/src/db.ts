import mongoose from "mongoose";

try {
    mongoose.connect("mongodb://localhost:27017/warehouse", {
        serverSelectionTimeoutMS: 50000,
        socketTimeoutMS: 45000
    });
    console.log("Successfully connected to database.")
} catch (error) {
    console.log("Error in connecting database ", error);
}

const userSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Password: String
}, {
    collection: 'User'
});

const locationSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type:String, required: true },
    parent_godown: { type: String, default: null, required: true }
}, {
    collection: "Location"
});

const itemSchema = new mongoose.Schema({
    item_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: [ "in_stock", "out_of_stock" ],
        default: "in_stock"
    },
    godown_id: { type: String, required: true },
    brand: { type: String, required: true },
    attributes: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    image_url: {
        type: String,
        required: true
    }
}, {
    collection: 'Item'
});

const User = mongoose.model("User", userSchema);
const Location = mongoose.model('Location', locationSchema);
const Item = mongoose.model("Item", itemSchema);

export {Location, User, Item}