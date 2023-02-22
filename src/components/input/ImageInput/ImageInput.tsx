import "./ImageInput.scss";
import { InputError, InputLabel } from "../../input";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { FaFontAwesome, FaPaperclip } from "react-icons/fa";
import { Button, Spinner } from "../../common";
import { useState } from "react";
interface ImageInputTypes
  extends ImageInputProps,
    FocusProps<HTMLInputElement> {
  /**
   * The type of text input. The default is 'text'.
   */
  type?: "text";
  /**
   * Text to be shown inside the input field when it is empty.
   */
  placeholder?: string;
  /**
   *
   */
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
  // type = "text",
  required,
  // onFocus,
  // onBlur,
  // placeholder = "",
  // disabled = false,
  // rounded = false,
  maxNumber,
}: ImageInputTypes): JSX.Element {
  // const maxNumber = 69;

  const [loading, setLoading] = useState(false);

  return (
    <div className="imagetinput">
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
                <div className="image-input">
                  <Spinner />
                  <p>Loading ...</p>
                </div>
              ) : imageList.length === 0 ? (
                <div
                  className="image-input"
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
              ) : (
                <div className="image-input preview">
                  <img src={imageList[0].dataURL} alt="" width="100" />
                  <div className="info">
                    <div style={{ paddingBottom: 6 }}>
                      {imageList[0].file?.name}
                    </div>
                    <div>{imageList[0].file?.size} kb</div>
                  </div>
                  <Button
                    type="danger"
                    label="Delete"
                    onClick={() => onImageRemove(0)}
                    className="btn"
                    icon={
                      "IoTrash"
                    }
                  />
                </div>
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
