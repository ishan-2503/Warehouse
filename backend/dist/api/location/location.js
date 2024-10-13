"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import mongoose from "mongoose";
const db_1 = require("../../db");
const items_1 = __importDefault(require("./items/items"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter || "";
    try {
        const godowns = yield db_1.Location.find({
            $and: [{
                    name: {
                        "$regex": filter,
                        "$options": "i"
                    }
                }, {
                    parent_godown: null,
                }]
        });
        res.json({
            locations: godowns.map((godown) => ({
                id: godown.id,
                name: godown.name,
                parent_godown: godown.parent_godown
            }))
        });
    }
    catch (err) {
        console.log("Error in location get route: " + err);
        res.json({
            message: "Location Not Found"
        });
    }
}));
router.get("/godown/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const filter = req.query.filter || "";
    try {
        const godowns = yield db_1.Location.find({
            $and: [{
                    parent_godown: id
                }, {
                    name: {
                        "$regex": filter,
                        "$options": "i"
                    }
                }]
        });
        res.json({
            Sublocations: godowns.map((godown) => ({
                id: godown.id,
                name: godown.name,
                parent_godown: godown.parent_godown
            }))
        });
    }
    catch (err) {
        console.log("Error in location/godown route: " + err);
        res.json({
            message: "This location contains no godowns."
        });
    }
}));
router.use("/godown/:id/items", items_1.default);
exports.default = router;
