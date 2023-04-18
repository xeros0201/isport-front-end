import "./ImageInput.scss";
import { InputError, InputLabel } from "../../input";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { FaPaperclip } from "react-icons/fa";
import { Button, Logo, Spinner } from "../../common";
import { useEffect, useState } from "react";
import classNames from "classnames";
const s3URL = import.meta.env.VITE_S3_URL;

interface ImageInputProps extends InputErrorProps, InputLabelProps {
  touched?: boolean;
  error?: string;
  required?: boolean;
  maxNumber?: number;
  onChange: (value: string | File) => void;
  value?: string | File;
  disabled?: boolean;
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
    if (value && typeof value === "string") {
      fetch(`${s3URL}/images/${value}`)
        .then((res) => res.blob())
        .then((blob) => {
          setImageList([
            {
              dataURL: `${s3URL}/images/${value}`,
              file: new File([blob], value),
            },
          ]);
        });
    }
  }, [value]);

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
          imageinput__wrap: true,
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

  const renderWithValue = (
    imageList: ImageListType,
    onImageRemove: (index: number) => void
  ) => {
    return (
      <div className="imageinput__wrap imageinput__wrap--with-value">
        {imageList[0].dataURL && <Logo url={imageList[0].dataURL} isSquare />}
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
              if (value[0].file) onChange(value[0].file);
            } else {
              setImageList([]);
              onChange("");
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
            {loading
              ? renderLoading()
              : imageList.length === 0
              ? renderEmpty(isDragging, onImageUpload, dragProps)
              : renderWithValue(imageList, onImageRemove)}
          </div>
        )}
      </ImageUploading>
      <InputError error={error} touched={touched} />
    </div>
  );
}

export default ImageInput;
