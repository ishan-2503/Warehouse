"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const signupSchema = zod_1.default.object({
    FirstName: zod_1.default.string(),
    LastName: zod_1.default.string(),
    Email: zod_1.default.string().email(),
    Password: zod_1.default.string()
});
exports.signupSchema = signupSchema;
const signinSchema = zod_1.default.object({
    Email: zod_1.default.string().email(),
    Password: zod_1.default.string()
});
exports.signinSchema = signinSchema;
