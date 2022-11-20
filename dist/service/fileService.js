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
const file_1 = __importDefault(require("../models/file"));
const fs = require('fs');
const directoryPath = __dirname.split('/');
directoryPath.pop();
directoryPath.pop();
const imagePath = directoryPath.join('/');
class FileService {
    constructor() {
        this.file = file_1.default;
        this.create = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req);
                const filename = req.filePath;
                const fileSize = req.fileSize;
                const result = yield this.file.create({ fileName: filename, fileSize });
                if (result) {
                    console.log("this is from result!");
                }
                console.log(result);
                console.log(filename);
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.remove = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const fileName = yield this.file.findOne({ where: {
                        id
                    } });
                const result = yield this.file.destroy({ where: {
                        id
                    } });
                if (!result) {
                    throw new Error("Somethingwent wrong while deleting");
                }
                else {
                    const name = fileName.dataValues.fileName;
                    console.log(name);
                    console.log(imagePath + "/" + name);
                    fs.unlinkSync(imagePath + "/" + name);
                }
                return true;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.file.findAll();
                if (!result) {
                    throw new Error("No File Data");
                }
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = FileService;
