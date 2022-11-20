import File from '../models/file'

const dbInit = () => {
    File.sync({alter:true});
}
export default dbInit 