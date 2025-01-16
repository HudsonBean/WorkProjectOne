/**========================================================================
 *                           IMPORTS
 *                           | HBD 01/14/2025
 *========================================================================**/
import { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DialogBox from "./DialogBox";

/**========================================================================
 *                           COMPONENT
 *                           | HBD 01/14/2025
 *========================================================================**/
export default function ProfilePictureDialog({ isOpen, onClose, onSave }) {
  // Refs for file input and image cropping | HBD 01/14/2025
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  // State for temporary image and crop data | HBD 01/14/2025
  const [tempProfilePicUrl, setTempProfilePicUrl] = useState(null);
  const [crop, setCrop] = useState();

  // Handlers for dialog interactions | HBD 01/14/2025
  const handleCloseDialog = () => {
    setTempProfilePicUrl(null);
    setCrop(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Image cropping utilities | HBD 01/14/2025
  const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
    imgRef.current = e.currentTarget;
  };

  // Function to get cropped image data | HBD 01/14/2025
  const getCroppedImg = async (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const canvasWidth = (crop.width * image.width) / 100;
    const canvasHeight = (crop.height * image.height) / 100;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    ctx.scale(1, 1);

    const cropX = (crop.x * image.width) / 100;
    const cropY = (crop.y * image.height) / 100;

    ctx.drawImage(
      image,
      cropX * scaleX,
      cropY * scaleY,
      canvasWidth * scaleX,
      canvasHeight * scaleY,
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(URL.createObjectURL(blob));
        },
        "image/jpeg",
        1
      );
    });
  };

  // Handle file selection | HBD 01/14/2025
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.match("image/(jpeg|png)")) {
        alert("File type not supported. Please upload a JPG or PNG image.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Please upload an image under 5MB.");
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      setTempProfilePicUrl(fileUrl);
    }
  };

  // Cleanup temporary URLs on unmount | HBD 01/14/2025
  useEffect(() => {
    return () => {
      if (tempProfilePicUrl) {
        URL.revokeObjectURL(tempProfilePicUrl);
      }
    };
  }, [tempProfilePicUrl]);

  // Save handler for cropped image | HBD 01/14/2025
  const handleSave = async () => {
    if (imgRef.current && crop) {
      const croppedImageUrl = await getCroppedImg(imgRef.current, crop);
      onSave(croppedImageUrl);

      if (tempProfilePicUrl) {
        URL.revokeObjectURL(tempProfilePicUrl);
      }
    }
    handleCloseDialog();
  };

  // Footer buttons for the dialog | HBD 01/14/2025
  const dialogFooter = (
    <>
      <button
        onClick={handleCloseDialog}
        type="button"
        className="dialog-box__footer__button dialog-box__footer__button--secondary"
      >
        Cancel
      </button>
      <button
        type="button"
        className="dialog-box__footer__button dialog-box__footer__button--primary"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </>
  );

  // Dialog content based on image state | HBD 01/14/2025
  const dialogContent = tempProfilePicUrl ? (
    <div className="profile-picture-dialog__content__crop-container">
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        aspect={1}
        circularCrop
      >
        <img
          ref={imgRef}
          src={tempProfilePicUrl}
          onLoad={onImageLoad}
          alt="Crop me"
          className="profile-picture-dialog__content__crop-image"
        />
      </ReactCrop>
    </div>
  ) : (
    <div
      className="profile-picture-dialog__content__upload-area"
      onClick={handleUploadClick}
      onKeyDown={(e) => e.key === "Enter" && handleUploadClick()}
      role="button"
      tabIndex={0}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
        name="file"
        className="profile-picture-dialog__content__upload-area__input"
        aria-label="Upload profile picture"
      />
      <FontAwesomeIcon icon={faPlus} />
      <span>Click to upload</span>
      <span className="profile-picture-dialog__content__upload-area__subtitle">
        Supported formats: JPG, PNG
      </span>
    </div>
  );

  return (
    <DialogBox
      isOpen={isOpen}
      onClose={handleCloseDialog}
      title="Change Profile Picture"
      footer={dialogFooter}
      showDefaultFooterButton={false}
      className="profile-picture-dialog"
    >
      {dialogContent}
    </DialogBox>
  );
}
