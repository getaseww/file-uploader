import { Router } from 'express'
const fileRouter=Router();
import FileController from '../controllers/fileController';
import image from '../middleware/image';

const fileController=new FileController();

fileRouter.route("/files").get(fileController.getAll);
fileRouter.route("/file").post(image,fileController.create);
fileRouter.route("/file/:id").delete(fileController.remove);

export default fileRouter;