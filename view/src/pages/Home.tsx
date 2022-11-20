import React, { useEffect, useState } from 'react'
import moment from 'moment';
import styled from 'styled-components'
import useNavigate from 'react-router-dom'
import axios from 'axios';
import { API_URL } from '../utils/constant'
const Card = styled.div`
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
`
const Title = styled.label`
font-size:20px;
font-weight:600;
padding-bottom:20px;
`
const Wrapper = styled.div`
padding-top:30px;
display:flex;
padding:20px;
justify-content:center;
width:50vw;
@media(max-width:600px){
    width:90vw;
}
`
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid;
`
const TableRow = styled.tr`
`
const TableHead = styled.th`
border: 1px solid #ddd;
`
const TableData = styled.td`
border: 1px solid #ddd;
`
const ShowButton = styled.button`
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
`
const EditButton = styled.button`
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
`
const DeleteButton = styled.button`
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
`
export default function Home() {
    const [files, setFiles] = useState([])
    const [selectedFile, setSelectedFile] = useState<any>();
    useEffect(() => {
         async function fetchFiles(){
            const res=await axios.get(API_URL+"files");
            if(res){
                setFiles(res.data.data);
            }else{
                console.log("no data");
            }
        }

        fetchFiles();
    }, [])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const res = await axios.post(API_URL + "file", {file:selectedFile}, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        console.log(res)
    }

    const deleteRecord = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault()
        const res=await axios.delete(API_URL+"file/"+id);
        if(res){
            console.log("success");
        }
    }
    // const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    //     if (selectedFile) {
    //         const formData = new FormData();
    //         formData.append("file", e.target.files[0]);
    //         console.log(formData);
    //     }
    // };
   const handleChange=function (selectorFiles: FileList)
    {
        setSelectedFile(selectorFiles[0])
        console.log(selectedFile);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Card>
                <Title>Select File</Title>
                <input type='file' onChange={ (e) => handleChange(e.target!.files!) } />
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
                        files.map((file: any, index: number) => (
                            <TableRow key={index}>
                                <TableData>{index + 1}</TableData>
                                <TableData>{file.fileName.split("/")[1]}</TableData>
                                <TableData>{file.fileSize+" bytes"}</TableData>
                                <TableData>{moment(file.createdAt).format('LL')}</TableData>
                                <TableData><DeleteButton onClick={(e) => deleteRecord(e, file.id)}>Delete</DeleteButton></TableData>
                            </TableRow>
                        ))
                        : <p>Loading...</p>
                    }
                </Table>
            </Wrapper>
        </div>
    )
}
