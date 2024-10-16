"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_1 = __importDefault(require("./api/location/location"));
const auth_1 = __importDefault(require("./api/auth/auth"));
const app = (0, express_1.default)();
const cors = require("cors");
app.use(express_1.default.json());
app.use(cors());
app.use("/location", location_1.default);
app.use("/auth", auth_1.default);
app.listen(5000, () => {
    console.log("App is listening on port 5000");
});
