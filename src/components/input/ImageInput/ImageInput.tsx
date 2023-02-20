import "./ImageInput.scss";
import { InputError, InputLabel } from "../../input";
import ImageUploading, { ImageListType } from "react-images-uploading";

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

  return (
    <div className="imagetinput">
      <InputLabel label={label} required={required} />
      <div className="App">
        <ImageUploading
          multiple
          value={values}
          onChange={onChange}
          maxNumber={maxNumber}
          acceptType={["png", "jpeg", "jpg"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <div
                className="image-input"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                
                Drop your file here or Browse
              </div>
              &nbsp;
              <button onClick={onImageRemoveAll}>Remove all images</button>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.dataURL} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
      <InputError error={error} touched={touched} />
    </div>
  );
}

export default ImageInput;
