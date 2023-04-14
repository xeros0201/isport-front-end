import "./FileInput.scss";
import { InputError, InputLabel } from "..";
// import ImageUploading, { ImageListType } from "react-images-uploading";
import { FaPaperclip } from "react-icons/fa";
import { Button, Logo, Spinner } from "../../common";
import { useEffect, useId, useState } from "react";
import classNames from "classnames";

interface FileInputProps {
  label?: string;
  touched?: boolean;
  error?: string;
  required?: boolean;
  multiple?: boolean;
  onReadFile: (data: CSVRow[]) => void;
  onChange: (file: File | string | null) => void;
  value: string | undefined | File;
}

/**
 * Text input component with preconfigured styling.
 */
function FileInput({
  label,
  value,
  onChange,
  touched,
  error,
  required,
  multiple = false,
  onReadFile,
}: FileInputProps): JSX.Element {
  const id = useId();
  const [fileList, setFileList] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Temporary - for mocking async upload delay
  const [loading, setLoading] = useState(false);

  const renderLoading = () => {
    return (
      <div className="fileinput__wrap">
        <Spinner />
        <p>Loading ...</p>
      </div>
    );
  };

  // handle drag events
  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setLoading(true);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e: any) => {
    e.preventDefault();

    setLoading(true);
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleRemove = () => {
    setFileList([]);
    onChange(null);
    onReadFile([]);
  };

  const handleReadFile = (file: File) => {
    // FileReader Object
    const reader = new FileReader();

    // Read file as string
    reader.readAsText(file);
    // Load event
    reader.onload = function (event: any) {
      // Read file data
      var csvdata = event.target.result;

      // Split by line break to gets rows Array
      var rowData = csvdata.split("\n");

      const keys = rowData[0].replace(/(\r\n|\n|\r)/gm, "").split(",");
      onReadFile(
        rowData.slice(1).map((row: string) => {
          return row
            .replace(/(\r\n|\n|\r)/gm, "")
            .split(",")
            .reduce(
              (obj, item, index) => ({ ...obj, [keys[index]]: item }),
              {}
            );
        })
      );
    };
  };

  const handleFiles = (files: File[]) => {
    setTimeout(() => {
      setFileList(files);
      onChange(files[0] as File);
      setLoading(false);
      handleReadFile(files[0]);
    }, 1000);
    // setFileList(files);
    // onChange("value");
  };

  const renderEmpty = () => {
    return (
      <>
        <label
          className={classNames({
            fileinput__wrap: true,
            "fileinput__wrap--empty": true,
            "fileinput__wrap--dragging": isDragging,
          })}
          htmlFor={id}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <p>
            <FaPaperclip style={{ marginRight: 4, fontSize: 16 }} />
            Drop your CSV file here or{" "}
            <span style={{ color: "#2596be" }}>Browse</span>
          </p>
        </label>

        <input
          type="file"
          id={id}
          className="fileinput__input"
          multiple={multiple}
          onChange={handleChange}
          accept={".csv"}
        />
      </>
    );
  };

  const renderWithValue = () => {
    return (
      <>
        <div className="fileinput__wrap fileinput__wrap--with-value">
          <div className="fileinput__info">
            <div style={{ paddingBottom: 6 }}>{fileList[0]?.name}</div>
            <div>{fileList[0]?.size} kb</div>
          </div>
          <Button
            type="danger"
            label="Delete"
            onClick={handleRemove}
            icon="IoTrash"
            size="small"
          />
        </div>
      </>
    );
  };

  return (
    <div className="fileinput">
      <InputLabel label={label} required={required} />
      {/* <ImageUploading
        multiple
        value={fileList}
        onChange={(value: ImageListType) => {
          setLoading(true);
          setTimeout(() => {
            if (value.length > 0) {
              setFileList(value);
              onChange("value");
            } else {
              setFileList([]);
              onChange("");
            }
            setLoading(false);
          }, 1000);
        }}
        maxNumber={maxNumber}
        acceptType={["png", "jpeg", "jpg"]}
      >
        {({
          fileList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {loading
              ? renderLoading()
              : fileList.length === 0
              ? renderEmpty(isDragging, onImageUpload, dragProps)
              : renderWithValue(fileList, onImageRemove)}
          </div>
        )}
      </ImageUploading> */}
      <div className="upload__image-wrapper">
        {loading
          ? renderLoading()
          : fileList.length === 0
          ? renderEmpty()
          : renderWithValue()}
      </div>
      <InputError error={error} touched={touched} />
    </div>
  );
}

export default FileInput;
