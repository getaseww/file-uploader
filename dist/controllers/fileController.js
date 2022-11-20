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
const fileService_1 = __importDefault(require("../service/fileService"));
const httpException_1 = __importDefault(require("../utils/httpException"));
class FileController {
    constructor() {
        this.fileService = new fileService_1.default();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                const fileSize = (_b = req.file) === null || _b === void 0 ? void 0 : _b.size;
                const result = yield this.fileService.create({ filePath, fileSize });
                res.status(201).json({ data: result });
            }
            catch (error) {
                next(new httpException_1.default(400, "can't upload data!"));
            }
        });
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.fileService.getAll();
                if (result) {
                    res.status(200).json({ data: result });
                }
            }
            catch (error) {
                next(new httpException_1.default(400, "someting went wrong while fetching!"));
            }
        });
        this.remove = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield this.fileService.remove(id);
                if (result) {
                    res.status(200).json({ messagge: "deleted successfully!" });
                }
            }
            catch (error) {
                next(new httpException_1.default(400, "someting went wrong"));
            }
        });
    }
}
exports.default = FileController;
