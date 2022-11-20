import { FileInput, FileOuput } from "../models/file";
import File from "../models/file";
const fs = require('fs');

const directoryPath = __dirname.split('/');
directoryPath.pop();
directoryPath.pop();
const imagePath=directoryPath.join('/');

interface FileAttr{
    filePath:string|undefined;
    fileSize:number|undefined;
}
class FileService{
    private file=File;

    public  create=async (req:FileAttr):Promise<FileOuput|Error>=>{
        try {
            console.log(req)
            const filename=req.filePath;
            const fileSize=req.fileSize;
            
            const result=await this.file.create({fileName:filename,fileSize});
            if(result){
                console.log("this is from result!");
            }
            console.log(result)
            console.log(filename)
             return result;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }


    public async getAll():Promise<FileOuput[]|Error>{
        try {
            const result=await this.file.findAll();

            if(!result){
                throw new Error("No File Data")
            }
            return result;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    public  remove=async(id:number):Promise<boolean|Error>=>{
        try {
            const fileName=await this.file.findOne({where:{
                id
            }})
            const result=await this.file.destroy({where:{
                id
            }});
            if(!result){
                throw new Error("Somethingwent wrong while deleting");
            }else{
                const name:string=fileName!.dataValues.fileName;
                console.log(name)
                console.log(imagePath+"/"+name)
                fs.unlinkSync(imagePath+"/" +name);

            }
            return true;
        } catch (error:any) {
         throw new Error(error.message);   
        }
    }
}

export default FileService;