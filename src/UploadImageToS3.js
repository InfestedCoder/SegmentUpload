import React, {useState} from 'react';

// TODO - pass in as an environment variable
const serverUrl = 'http://localhost:3000'

let drawing;

const UploadImageToS3 = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => setSelectedFile(e.target.files[0]);

    const uploadFile = async (file, segment) => {
        if (!drawing) {
            drawing = await createDrawing();
        }
        const body = {
            contentType: "image/jpeg",
            ext: "jpg",
            createdBy: "Sam Segment"
        }

        const requestObject = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors"
        }

        const url = serverUrl + '/drawings/' + drawing.id + '/segments/' + segment;

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
        <div>Image</div>
        <input type="file" onChange={handleFileInput}/>

        <div>Top</div>
        <button onClick={() => uploadFile(selectedFile, 'top')}> Upload as top</button>

        <div>Middle</div>
        <button onClick={() => uploadFile(selectedFile, 'middle')}> Upload as middle</button>

        <div>Bottom</div>
        <button onClick={() => uploadFile(selectedFile, 'bottom')}> Upload as bottom</button>
    </>
}

async function createDrawing() {
    const url = serverUrl + '/drawings';

    const body = {
        createdBy: "Dawn Drawing"
    }

    const requestObject = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors"
    }

    const response = await fetch(url, requestObject);
    return await response.json();
}

export default UploadImageToS3;