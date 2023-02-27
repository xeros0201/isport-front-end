declare global {
  /**
   * Represents an option provided to an input.
   * Used for dropdown lists, radios, etc.
   */
  export interface InputOption {
    value: string;
    label: string;
  }

  /**
   * Represents an option provided to an input.
   * Same as InputOption, but optionally allows
   * for an image in the option.
   */
  export interface InputOptionWithImage extends InputOption {
    image?: string;
  }

  export interface InputLabelProps {
    /**
     * The instructional text written above the text input.
     */
    label?: string;
    /**
     * Displays an asterisks to mark input as being required.
     */
    required?: boolean;
    /**
     * Required for binding the label to the input (used for
     * accessibility such as screen readers).
     */
    htmlFor?: string;
  }

  export interface InputErrorProps {
    /**
     * Whether the input component has been interacted with.
     */
    touched?: boolean;
    /**
     * An error message to be displayed below the input.
     */
    error?: string;
  }

  export interface InputProps extends InputErrorProps, InputLabelProps {
    /**
     * The input's value.
     */
    value?: string;
    /**
     * The function to be called with the updated/selected
     * value when the input is modified.
     */
    onChange: (value: string) => void;
    /**
     * Whether the input can be interacted with.
     */
    disabled?: boolean;
  }

  export interface InputWithOptionsProps extends InputProps {
    /**
     * The options to be displayed to the user.
     */
    options: InputOption[];
  }

  export interface FocusProps<T> {
    /**
     * Function
     */
    onFocus?: React.FocusEventHandler<T>;
    /**
     *
     */
    onBlur?: React.FocusEventHandler<T>;
  }

  export interface TwoOrMoreArray<T> extends Array<T> {
    0: T;
    1: T;
  }

  export interface AsInputProps {
    /**
     * Whether this component should be styled and behave like an input.
     * Perfect for components that are only sometimes used as inputs (such as dropdowns).
     */
    asInput?: boolean;
  }

  export interface AsyncOptionsInputProps {
    /**
     * Whether options are still being fetched.
     */
    isFetching?: boolean;
  }

  export interface ImplementedDropdownProps extends InputProps, AsInputProps {}
}

export {};
