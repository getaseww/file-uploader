"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const moment_1 = __importDefault(require("moment"));
const styled_components_1 = __importDefault(require("styled-components"));
const axios_1 = __importDefault(require("axios"));
const constant_1 = require("../utils/constant");
const Card = styled_components_1.default.div `
margin-top:40px;
padding-bottom:20px;
width:50vw;
height:150px;
display:flex;
flex-direction:column;
align-items:center;
@media(max-width:600px){
    width:90vw;
}
border:1px solid black;
border-radius:10px;
`;
const Title = styled_components_1.default.label `
font-size:20px;
font-weight:600;
padding-bottom:20px;
`;
const Wrapper = styled_components_1.default.div `
padding-top:30px;
display:flex;
padding:20px;
justify-content:center;
width:50vw;
@media(max-width:600px){
    width:90vw;
}
`;
const Table = styled_components_1.default.table `
  width: 100%;
  border-collapse: collapse;
  border: 1px solid;
`;
const TableRow = styled_components_1.default.tr `
`;
const TableHead = styled_components_1.default.th `
border: 1px solid #ddd;
`;
const TableData = styled_components_1.default.td `
border: 1px solid #ddd;
`;
const ShowButton = styled_components_1.default.button `
margin:5px;
border-radius:5px;
border:none;
padding:10px;
background-color:#b6b8ba;
color:white;
font-size:17px;
&:hover{
    background-color:#b6b8ff;
}
`;
const EditButton = styled_components_1.default.button `
margin:20px;
border-radius:5px;
border:none;
padding:10px 60px;
background-color:#0b5fe6;
color:white;
font-size:17px;
&:hover{
    background-color:#0bafe6;
}
`;
const DeleteButton = styled_components_1.default.button `
border-radius:5px;
margin:5px;
border:none;
padding:10px;
background-color:#c91a14;
color:white;
font-size:17px;
&:hover{
    background-color:#ec1a14;
}
`;
function Home() {
    const [files, setFiles] = (0, react_1.useState)([]);
    const [selectedFile, setSelectedFile] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        function fetchFiles() {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield axios_1.default.get(constant_1.API_URL + "files");
                if (res) {
                    setFiles(res.data.data);
                }
                else {
                    console.log("no data");
                }
            });
        }
        fetchFiles();
    }, []);
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const res = yield axios_1.default.post(constant_1.API_URL + "file", { file: selectedFile }, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(res);
    });
    const deleteRecord = (e, id) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const res = yield axios_1.default.delete(constant_1.API_URL + "file/" + id);
        if (res) {
            console.log("success");
        }
    });
    // const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    //     if (selectedFile) {
    //         const formData = new FormData();
    //         formData.append("file", e.target.files[0]);
    //         console.log(formData);
    //     }
    // };
    const handleChange = function (selectorFiles) {
        setSelectedFile(selectorFiles[0]);
        console.log(selectedFile);
    };
    return (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Card>
                <Title>Select File</Title>
                <input type='file' onChange={(e) => handleChange(e.target.files)}/>
                <EditButton onClick={handleSubmit}>Upload</EditButton>
            </Card>
            <Wrapper>
                <Table>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>File Name</TableHead>
                        <TableHead>File Size</TableHead>
                        <TableHead>Uploaded Date</TableHead>
                        <TableHead>Delete</TableHead>
                    </TableRow>
                    {files ?
            files.map((file, index) => (<TableRow key={index}>
                                <TableData>{index + 1}</TableData>
                                <TableData>{file.fileName.split("/")[1]}</TableData>
                                <TableData>{file.fileSize + " bytes"}</TableData>
                                <TableData>{(0, moment_1.default)(file.createdAt).format('LL')}</TableData>
                                <TableData><DeleteButton onClick={(e) => deleteRecord(e, file.id)}>Delete</DeleteButton></TableData>
                            </TableRow>))
            : <p>Loading...</p>}
                </Table>
            </Wrapper>
        </div>);
}
exports.default = Home;
