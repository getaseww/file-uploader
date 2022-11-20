"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileRouter = (0, express_1.Router)();
const fileController_1 = __importDefault(require("../controllers/fileController"));
const image_1 = __importDefault(require("../middleware/image"));
const fileController = new fileController_1.default();
fileRouter.route("/files").get(fileController.getAll);
fileRouter.route("/file").post(image_1.default, fileController.create);
fileRouter.route("/file/:id").delete(fileController.remove);
exports.default = fileRouter;
