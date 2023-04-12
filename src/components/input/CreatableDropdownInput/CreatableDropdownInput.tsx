import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Spinner } from "../../common";
import InputError from "../InputError/InputError";
import InputLabel from "../InputLabel/InputLabel";
import "../DropdownInput/DropdownInput.scss";

interface DropdownInputProps<T>
  extends InputWithOptionsProps,
    AsInputProps,
    AsyncOptionsInputProps {
  handleCreateRequest: (value: string) => Promise<T>;
  placeholder?: string;
  setOptions: React.Dispatch<React.SetStateAction<InputOption[]>>;
}

function CreatableDropdownInput<T extends { id: string }>({
  disabled,
  error,
  handleCreateRequest,
  isFetching,
  label,
  onChange,
  options = [],
  required,
  setOptions,
  touched,
  value,
}: DropdownInputProps<T>) {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (newValue: string) => {
    setLoading(true);
    const res = await handleCreateRequest(newValue);
    const newOption = {
      value: res.id.toString(),
      label: newValue,
    };
    setOptions((prev) => [...prev, newOption]);
    onChange(res.id.toString());
    setLoading(false);
  };

  return (
    <div className={"dropdowninput dropdowninput--as-input"}>
      <InputLabel label={label} required={required} />
      {!isFetching && (
        <CreatableSelect
          className="create-select"
          isClearable
          isDisabled={disabled || loading}
          onChange={(newValue) => onChange(newValue?.value ?? "")}
          onCreateOption={handleCreate}
          options={options}
          value={options.find((item) => item.value === value)}
          menuPlacement="auto"
        />
      )}
      {isFetching && (
        <div className="dropdowninput__spinner">
          <Spinner size="tiny" />
        </div>
      )}
      <InputError error={error} touched={touched} />
    </div>
  );
}

export default CreatableDropdownInput;
