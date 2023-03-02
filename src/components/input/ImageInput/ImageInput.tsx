import "./ImageInput.scss";
import { InputError, InputLabel } from "../../input";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { FaPaperclip } from "react-icons/fa";
import { Button, Logo, Spinner } from "../../common";
import { useEffect, useState } from "react";
import classNames from "classnames";

interface ImageInputProps extends InputProps {
  touched?: boolean;
  error?: string;
  required?: boolean;
  maxNumber?: number;
}

/**
 * Text input component with preconfigured styling.
 */
function ImageInput({
  label,
  value,
  onChange,
  touched,
  error,
  required,
  maxNumber,
}: ImageInputProps): JSX.Element {
  const [imageList, setImageList] = useState<ImageListType>([]);
  
  // Temporary - for mocking async upload delay
  const [loading, setLoading] = useState(false);
  // Temporary - for converting a test image into the necessary format
  useEffect(() => {
    if (value) {
      fetch('/public/isports.png')
        .then(res => res.blob())
        .then(blob => {
          setImageList([{
            dataURL: "/public/league-logo.png",
            file: new File([blob], "/public/isports.png", { type: "image/png" })
          }]);
        });
    }
  }, []);

  const renderLoading = () => {
    return (
      <div className="imageinput__wrap">
        <Spinner />
        <p>Loading ...</p>
      </div>
    );
  };

  const renderEmpty = (
    isDragging: boolean,
    onImageUpload: () => void,
    dragProps: any
  ) => {
    return (
      <div
        className={classNames({
          "imageinput__wrap": true,
          "imageinput__wrap--empty": true,
          "imageinput__wrap--dragging": isDragging,
        })}
        onClick={onImageUpload}
        {...dragProps}
      >
        <p>
          <FaPaperclip style={{ marginRight: 4, fontSize: 16 }} />
          Drop your file here or{" "}
          <span style={{ color: "#2596be" }}>Browse</span>
        </p>
      </div>
    );
  };
  
  const renderWithValue = (imageList: ImageListType, onImageRemove:(index: number) => void) => {
    return (
      <div className="imageinput__wrap imageinput__wrap--with-value">
        {imageList[0].dataURL &&
          <Logo url={imageList[0].dataURL} isSquare />
        }
        <div className="imageinput__info">
          <div style={{ paddingBottom: 6 }}>{imageList[0].file?.name}</div>
          <div>{imageList[0].file?.size} kb</div>
        </div>
        <Button
          type="danger"
          label="Delete"
          onClick={() => onImageRemove(0)}
          icon="IoTrash"
          size="small"
        />
      </div>
    );
  };

  return (
    <div className="imageinput">
      <InputLabel label={label} required={required} />
      <ImageUploading
        multiple
        value={imageList}
        onChange={(value: ImageListType) => {
          setLoading(true);
          setTimeout(() => {
            if (value.length > 0) {
              setImageList(value);
              onChange('value');
            } else {
              setImageList([]);
              onChange('');
            }
            setLoading(false);
          }, 1000);
        }}
        maxNumber={maxNumber}
        acceptType={["png", "jpeg", "jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {loading ? (
              renderLoading()
            ) : imageList.length === 0 ? (
              renderEmpty(isDragging, onImageUpload, dragProps)
            ) : (
              renderWithValue(imageList, onImageRemove)
            )}
          </div>
        )}
      </ImageUploading>
      <InputError error={error} touched={touched} />
    </div>
  );
}

export default ImageInput;