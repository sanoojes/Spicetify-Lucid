import type { InputSetting } from "@/types/input";
import { debounce } from "@/utils/debounce";
import React, {
  useState,
  useCallback,
  type ChangeEvent,
  type FC,
  useMemo,
  forwardRef,
} from "react";

// TODO: implement input validation
const Input = forwardRef<HTMLInputElement, InputSetting>(
  (
    { label, defaultValue, onChange, type, placeholder, settings, validation },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string | number | null>(
      defaultValue || null
    );

    const debouncedStringOnChange = useMemo(() => {
      return debounce((value: string) => {
        if (type !== "file") {
          onChange?.(value);
        }
      }, 1000);
    }, [onChange]);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (type === "file") {
          const files = e.target.files;
          onChange?.(files);
        } else {
          const value = e.target.value;
          setInputValue(value);
          debouncedStringOnChange(value);
        }
      },
      [debouncedStringOnChange]
    );

    return (
      <div className='input-container'>
        <label
          aria-label={label}
          className={type === "file" ? "input" : "label"} // acts as input button for file type
        >
          <input
            aria-label={label}
            type={type}
            accept={
              type === "file"
                ? settings
                  ? settings.accept
                  : "image/*"
                : undefined
            }
            multiple={
              type === "file"
                ? settings
                  ? settings.multiple
                  : false
                : undefined
            }
            className='input encore-text'
            value={inputValue ?? ""}
            onChange={handleChange}
            placeholder={placeholder}
            step={
              type === "number"
                ? settings?.step
                  ? settings.step
                  : 1
                : undefined
            }
            min={
              type === "number" ? (settings?.min ? settings.min : 0) : undefined
            }
            max={
              type === "number"
                ? settings?.max
                  ? settings.max
                  : 100
                : undefined
            }
            ref={ref}
            style={type === "file" ? { display: "none" } : {}}
          />
          {type === "file" ? "Upload Image" : null}
        </label>
      </div>
    );
  }
);

export default Input;
