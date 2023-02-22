import { Page } from "../../../components/layout";
import { ImageListType } from "react-images-uploading";
import ImageInput from "../../../components/input/ImageInput/ImageInput";
import { useState } from "react";

const Test = () => {
    const [images, setImages] = useState<ImageListType>([]);

  return (
    <Page title="Test">
      <h1>Test page</h1>
      <ImageInput
        values={images}
        onChange={(values: ImageListType): void => {
          setImages(values);
        }}
      />
    </Page>
  );
};

export default Test;
