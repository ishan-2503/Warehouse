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
const types_1 = require("../../types");
const db_1 = require("../../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
// const secret_key = process.env.JWT_SECRET;
router.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const createpayload = req.body;
        const parsepayload = types_1.signupSchema.safeParse(createpayload);
        if (!parsepayload.success) {
            res.status(411).json({ message: "Invalid Input" });
        }
        try {
            const exisitinguser = yield db_1.User.findOne({ Email: createpayload.Email });
            if (exisitinguser) {
                res.status(409).json({ message: "User already exists" });
            }
            else {
                try {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    console.log("Salt: " + salt);
                    const hashedPassword = yield bcrypt_1.default.hash(createpayload.Password, salt);
                    console.log("hashedPassword: " + hashedPassword);
                    const user = yield db_1.User.create({
                        FirstName: createpayload.FirstName,
                        LastName: createpayload.LastName,
                        Email: createpayload.Email,
                        Password: hashedPassword,
                    });
                    const userId = user._id;
                    const token = jsonwebtoken_1.default.sign({ userId }, "Ishan@jwt");
                    res
                        .status(201)
                        .json({ message: "User Registered Successfully", token });
                }
                catch (error) {
                    console.log("Error in HashedPassword and token section: " + error);
                }
            }
        }
        catch (err) {
            console.log("Error in registration: " + err);
            res.status(500).json({ message: "Error creating user" });
        }
    });
});
router.post("/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const createpayload = req.body;
        const parsepayload = types_1.signinSchema.safeParse(createpayload);
        if (!parsepayload.success) {
            res.status(411).json({ message: "Invalid Input" });
        }
        const existinguser = yield db_1.User.findOne({ Email: createpayload.Email });
        if (!existinguser) {
            res.status(400).json({ message: "Invalid email or password" });
        }
        else {
            try {
                const isValidPassword = yield bcrypt_1.default.compare(createpayload.Password, existinguser.Password);
                if (!isValidPassword) {
                    res.status(400).json({ message: "Invalid password" });
                    console.log("invalid password");
                }
                else {
                    const userId = existinguser._id;
                    const token = jsonwebtoken_1.default.sign({ userId }, "Ishan@jwt");
                    res.status(200).json({ message: "Login successful", token });
                }
            }
            catch (error) {
                console.log("Error in isValidPassword: " + error);
            }
        }
    });
});
exports.default = router;
