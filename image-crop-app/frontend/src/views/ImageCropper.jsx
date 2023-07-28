import Cropper from 'react-easy-crop';
import { useRef, useState, useEffect } from "react";

function ImageCropper() {

    const cropperRef = useRef(null);
    const [image, setImage] = useState(null);
    const [cropData, setCropData] = useState([]);
    const [cropper, setCropper] = useState();

    useEffect(()=>{
        showCropOnPicture()
    }, [imageSize])

    useEffect(()=>{
        setImage(imgIn[0])
    }, [imgIn])

    useEffect(()=>{
        updateImg(cropData)
    }, [cropData])

    
    

    const onCrop = () => {
        if (cropperRef) {
            const imageElement = cropperRef.current;
            const cropper = imageElement.cropper;
        }
    };

    const setSmallCrop = () => {
        setImageSize(256)
        setCropData([cropper.getCroppedCanvas().toDataURL()]);
        setImage(cropData[0])
    }

    const setSquareCrop = () => {
        setImageSize(getLeastWidthOrHeight()) // use the least width or height of the image
        setCropData([cropper.getCroppedCanvas().toDataURL()]);
        setImage(cropData[0])
    }

    const setOriginalCrop = () => {
        cropper.reset()
        setCropData([cropper.getCroppedCanvas().toDataURL()]);
        setImage(cropData[0])
    }

    const setAllSizesCrop = () => {
        let n = []
        // square of original
        setImageSize(getLeastWidthOrHeight()) // use the least width or height of the image
        n.push(cropper.getCroppedCanvas().toDataURL())
        cropper.reset()
        // small 256px x 256px
        setImageSize(256)
        n.push(cropper.getCroppedCanvas().toDataURL());
        cropper.reset()
        // original
        n.push(cropper.getCroppedCanvas().toDataURL());
        setCropData(n)
        setImage(cropData[0])
        console.log('cropped for all');
    }

    const getCropData = () => {
        console.log('getCropData.cropping for', imageSize);
        
        if (typeof cropper !== "undefined") {
            if (imageSize === "square") {
                setSquareCrop()
            } else if (imageSize === "small") {
                setSmallCrop()
            } else if (imageSize === "all") {
                setAllSizesCrop()
            } else { // original
                setOriginalCrop()
            }
        }
    };

    const getLeastWidthOrHeight = () => {
        return cropper.getImageData().height > cropper.getImageData().width ? cropper.getImageData().width : cropper.getImageData().height
    }


    const showCropOnPicture = () => {
        console.log('showCropOnPicture.cropping for', imageSize);
        
        if (typeof cropper !== "undefined") {

            if (imageSize == "square") {
                setImageSize(getLeastWidthOrHeight())
            } else if (imageSize == "small") {
                setImageSize(256)
            } else if (imageSize === "all") {
                setImageSize(cropData)
            } else { // original
                cropper.reset()
            }
        }
    };

    const setImageSize = (size) => {
        cropper.setCropBoxData({
            left: cropper.getCanvasData().left,
            top: cropper.getCanvasData().top,
            width: size,
            height: size
        })
    }

    return (
        <>
        <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={16 / 9}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
            onInitialized={(instance) => {
                setCropper(instance);
            }}
            guides={true}
        />

        <button className="btn btn-secondary mb-4" onClick={() => {
            getCropData()
            console.log('updating ...');
        }}>
            Crop Image
        </button>
        </>
    )
}
export default ImageCropper