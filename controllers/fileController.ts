import { NextFunction } from "express";
import FileService from "../service/fileService";
import HttpException from "../utils/httpException";
import express, { Request, Response } from 'express';
import { json } from "sequelize";
import FileModel from '../models/file'

class FileController {
    private fileService = new FileService();
    
    public create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const filePath = req.file?.path
            const fileSize=req.file?.size;
            const result = await this.fileService.create({filePath,fileSize});
            res.status(201).json({ data: result })
        } catch (error) {
            next(new HttpException(400, "can't upload data!"));
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const result = await this.fileService.getAll();
            if (result) {
                res.status(200).json({ data: result });
            }
        } catch (error) {
            next(new HttpException(400, "someting went wrong while fetching!"))
        }
    }

    public remove = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const id: number = parseInt(req.params.id);
            const result = await this.fileService.remove(id);
            if (result) {
                res.status(200).json({ messagge: "deleted successfully!" })
            }
        } catch (error) {
            next(new HttpException(400, "someting went wrong"))
        }
    }
}

export default FileController;