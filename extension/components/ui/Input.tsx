import { addToast } from "@/services/toastService";
import type { InputSetting } from "@/types/input";
import { debounce } from "@/utils/debounce";
import React, {
  useState,
  useCallback,
  ChangeEvent,
  type FC,
  useMemo,
  forwardRef,
  useEffect,
} from "react";

// TODO: implement input validation
const Input: React.ForwardRefExoticComponent<
  InputSetting & React.RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, InputSetting>(
  (
    { label, defaultValue, onChange, type, placeholder, settings, validation },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string | number | null>(
      defaultValue || null
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const isFileInput = type === "file";
    const isNumberInput = type === "number";

    const debouncedStringOnChange = useMemo(() => {
      return debounce((value: string) => {
        if (!isFileInput) {
          onChange?.(value);
        }
      }, 1000);
    }, [onChange]);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (isFileInput) {
          const files = e.target.files;
          onChange?.(files);
        } else if (isNumberInput && settings) {
          const value = Number(e.target.value);
          const maxValue = settings.max ?? 100;
          const minValue = settings.min ?? 0;

          if (value > maxValue) {
            setErrorMessage(`Value cannot exceed ${maxValue}`);
          } else if (value < minValue) {
            setErrorMessage(`Value cannot be less than ${minValue}`);
          } else {
            setErrorMessage(null); // Clear error if within limits
          }

          const limitedValue = Math.min(
            Math.max(value, minValue),
            maxValue
          ).toString();

          setInputValue(limitedValue);
          debouncedStringOnChange(limitedValue);
        } else {
          const value = e.target.value;
          setInputValue(value);
          setErrorMessage(null);
          ``;
          debouncedStringOnChange(value);
        }
      },
      [debouncedStringOnChange, settings]
    );

    useEffect(() => {
      if (errorMessage) {
        addToast(errorMessage, true);
      }
    }, [errorMessage]);

    return (
      <div className='input-container'>
        <label aria-label={label} className={isFileInput ? "input" : "label"}>
          <input
            aria-label={label}
            type={type}
            accept={isFileInput ? settings?.accept ?? "image/*" : undefined}
            multiple={isFileInput ? settings?.multiple ?? false : undefined}
            className='input encore-text'
            value={inputValue ?? ""}
            onChange={handleChange}
            placeholder={placeholder}
            step={isNumberInput ? settings?.step ?? 1 : undefined}
            min={isNumberInput ? settings?.min : undefined}
            max={isNumberInput ? settings?.max : undefined}
            ref={ref}
            style={isFileInput ? { display: "none" } : {}}
          />
          {isFileInput ? "Upload Image" : null}
        </label>
      </div>
    );
  }
);

export default Input;
