import React, {useState} from 'react';

// TODO - pass in the id of the drawing we want to add segments to
const DRAWING_ID = 'b794d585-aefb-460e-b618-9ed36df857e9';

// TODO - pass in as an environment variable
const initiateUploadURL = 'http://localhost:3000'

const UploadImageToS3 = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => setSelectedFile(e.target.files[0]);

    const uploadFile = (file, drawingId, segment) => {
        const body = {
            contentType: "image/jpeg",
            ext: "jpg",
            createdBy: "Alberto"
        }

        const requestObject = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors"
        }

        const url = initiateUploadURL + '/drawings/' + drawingId + '/segments/' + segment;

        fetch(url, requestObject)
            .then(res => res.json())
            .then(data => {
                fetch(data.preSignedUrl, {
                    method: 'PUT',
                    body: file
                }).then((res) => {
                    console.log('Upload succeeded!')
                }).catch(err => {
                    console.log(err)
                })
            })
    }


    return <>
        <div>Top</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile, DRAWING_ID, 'top')}> Upload top to S3</button>

        <div>Middle</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile, DRAWING_ID, 'middle')}> Upload middle to S3</button>

        <div>Bottom</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile, DRAWING_ID, 'bottom')}> Upload bottom to S3</button>
    </>
}

export default UploadImageToS3;