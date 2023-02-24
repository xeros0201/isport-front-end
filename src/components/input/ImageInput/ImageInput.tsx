import "./ImageInput.scss";
import { InputError, InputLabel } from "../../input";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { FaFontAwesome, FaPaperclip } from "react-icons/fa";
import { Button, Spinner } from "../../common";
import { useState } from "react";

interface ImageInputTypes {
  label?: string;

  touched?: boolean;

  error?: string;

  required?: boolean;

  placeholder?: string;

  rounded?: boolean;

  onChange: (
    values: ImageListType,
    addUpdatedIndex: number[] | undefined
  ) => void;

  values: ImageListType;

  maxNumber?: number;
}

/**
 * Text input component with preconfigured styling.
 */
function ImageInput({
  label,
  values,
  onChange,
  touched,
  error,
  required,
  maxNumber,
}: ImageInputTypes): JSX.Element {

  const [loading, setLoading] = useState(false);

  const renderLoading = () => {
    return (
      <div className="wrapper">
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
        className="wrapper"
        style={isDragging ? { color: "red" } : undefined}
        onClick={onImageUpload}
        {...dragProps}
      >
        <FaPaperclip style={{ marginTop: 15, marginRight: 10 }} />
        <p>
          Drop your file here or{" "}
          <span style={{ color: "#2596be" }}>Browse</span>
        </p>
      </div>
    );
  };
  const renderWithValue = (imageList: ImageListType, onImageRemove:(index: number) => void) => {
    return (
      <div className="wrapper preview">
      <img src={imageList[0].dataURL} alt="" width="100" />
      <div className="info">
        <div style={{ paddingBottom: 6 }}>{imageList[0].file?.name}</div>
        <div>{imageList[0].file?.size} kb</div>
      </div>
      <Button
        type="danger"
        label="Delete"
        onClick={() => onImageRemove(0)}
        icon="IoTrash"
      />
    </div>
    );
  };

  return (
    <div className="image-input">
      <InputLabel label={label} required={required} />
      <div className="App">
        <ImageUploading
          multiple
          value={values}
          onChange={(
            value: ImageListType,
            addUpdatedIndex?: number[] | undefined
          ) => {
            setLoading(true);

            setTimeout(
              () => {
                onChange(value, addUpdatedIndex);

                setLoading(false);
              },
              value.length === 0 ? 500 : 2000
            );
          }}
          maxNumber={maxNumber}
          acceptType={["png", "jpeg", "jpg"]}
        >
          {({
            imageList,
            onImageUpload,
            // onImageRemoveAll,
            // onImageUpdate,
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
      </div>
      <InputError error={error} touched={touched} />
    </div>
  );
}

export default ImageInput;
