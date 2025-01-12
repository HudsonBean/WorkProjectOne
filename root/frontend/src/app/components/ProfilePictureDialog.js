import { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePictureDialog({
  isOpen,
  onClose,
  onSave,
  defaultImage,
}) {
  const fileInputRef = useRef(null);
  const [tempProfilePicUrl, setTempProfilePicUrl] = useState(null);
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);

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

  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
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
  }

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
    imgRef.current = e.currentTarget;
  };

  async function getCroppedImg(image, crop) {
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
  }

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

  useEffect(() => {
    return () => {
      if (tempProfilePicUrl) {
        URL.revokeObjectURL(tempProfilePicUrl);
      }
    };
  }, [tempProfilePicUrl]);

  return (
    <div className={`dialog-overlay ${isOpen ? "dialog-overlay--active" : ""}`}>
      <div className="dialog animate-fade-in">
        <div className="dialog__header">
          <h2>Change Profile Picture</h2>
          <button
            onClick={handleCloseDialog}
            className="dialog__close-button"
            type="button"
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>
        <div className="dialog__content">
          {tempProfilePicUrl ? (
            <div className="dialog__content__crop-container">
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
                  className="dialog__content__crop-image"
                />
              </ReactCrop>
            </div>
          ) : (
            <div
              className="dialog__content__upload-area"
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
                name="profilePictureUrl"
                className="dialog__content__upload-area__input"
                aria-label="Upload profile picture"
              />
              <FontAwesomeIcon icon={faPlus} />
              <span>Click to upload</span>
              <span className="dialog__content__upload-area__subtitle">
                Supported formats: JPG, PNG
              </span>
            </div>
          )}
        </div>
        <div className="dialog__footer">
          <button
            onClick={handleCloseDialog}
            type="button"
            className="dialog__footer__button dialog__footer__button--secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            className="dialog__footer__button dialog__footer__button--primary"
            onClick={async () => {
              if (imgRef.current && crop) {
                const croppedImageUrl = await getCroppedImg(
                  imgRef.current,
                  crop
                );
                onSave(croppedImageUrl);

                // Clean up the old profile picture URL if it's not the default
                if (tempProfilePicUrl) {
                  URL.revokeObjectURL(tempProfilePicUrl);
                }
              }
              handleCloseDialog();
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
