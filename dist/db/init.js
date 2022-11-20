"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = __importDefault(require("../models/file"));
const dbInit = () => {
    file_1.default.sync({ alter: true });
};
exports.default = dbInit;
