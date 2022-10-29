"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URL = process.env.MONGO_URL || 'mongodb://127.0.0.1/interview-database';
mongoose_1.default
    .connect(URL)
    .then(() => console.log('Database connected'))
    .catch((e) => {
    throw e;
});
