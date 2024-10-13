"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = exports.User = exports.Location = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
try {
    mongoose_1.default.connect("mongodb://localhost:27017/warehouse", {
        serverSelectionTimeoutMS: 50000,
        socketTimeoutMS: 45000
    });
    console.log("Successfully connected to database.");
}
catch (error) {
    console.log("Error in connecting database ", error);
}
const userSchema = new mongoose_1.default.Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Password: String
}, {
    collection: 'User'
});
const locationSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    parent_godown: { type: String, default: null, required: true }
}, {
    collection: "Location"
});
const itemSchema = new mongoose_1.default.Schema({
    item_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ["in_stock", "out_of_stock"],
        default: "in_stock"
    },
    godown_id: { type: String, required: true },
    brand: { type: String, required: true },
    attributes: {
        type: Map,
        of: mongoose_1.default.Schema.Types.Mixed
    },
    image_url: {
        type: String,
        required: true
    }
}, {
    collection: 'Item'
});
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
const Location = mongoose_1.default.model('Location', locationSchema);
exports.Location = Location;
const Item = mongoose_1.default.model("Item", itemSchema);
exports.Item = Item;
