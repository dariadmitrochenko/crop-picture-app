import { useState } from "react"
import ImageCropper from '/Users/dariadmitrochenko/image-crop--app/react/src/views/ImageCropper.jsx';
import axiosClient from "../axios-client.js";

export default function ProcessImage() {

    const [uploadMethod, setUploadMethod] = useState('original')

    const [selectedFile, setSelectedFile] = useState([]);

    const handleSelectUploadChange = (evt) => {
        console.log('setting upload value', evt.nativeEvent.target.value);
        setUploadMethod(evt.nativeEvent.target.value);
    }

    const handleFileUploadChange = (evt) => {

        evt.preventDefault();
        
        let files;
        if (evt.dataTransfer) {
            files = evt.dataTransfer.files;
        } else if (evt.target) {
            files = evt.target.files;
        }

        if (evt.target.files.length) {
            createImage(evt.target.files[0]);
        }

        console.log('evt.nativeEvent.target', evt.target.files.length);
        // reset drop down to original
        setUploadMethod('original')
    }

    const submitForm = () => {
        console.log('submit');

        axiosClient.post('/uploads', {
            imagefile: selectedFile,
            imagetext: uploadMethod
        }).then(response => {
            console.log('submitted', response)
        }).catch((err) => {
            console.log(err);
            console.error('post err', err);
        })
    };

    const createImage = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            setSelectedFile([e.target.result])
        };
        reader.readAsDataURL(file);
    }


    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
              <form>
                <h1 className="title">Select upload option</h1>
                <select className="form-control" name="upload-method" id="upload-select" onChange={handleSelectUploadChange} value={uploadMethod}>
                  <option value="original">Original</option>
                  <option value="square">Square</option>
                  <option value="small">Small</option>
                  <option value="all">All Three</option>
                  <input type="file" accept="image/x-png,image/jpeg" onChange={handleFileUploadChange} />
                </select>
                <ImageCropper imgIn={selectedFile} imageSize={uploadMethod} updateImg={setSelectedFile} />
                <button className="btn btn-block" onClick={submitForm}>Submit</button>
              </form>
            </div>
        </div>

            
    )
}