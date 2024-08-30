import React from 'react';
import type { BackgroundMode } from '@/types/settingTypes';

type DropdownProps<T> = {
  options: { label: string; value: T }[];
  selectedValue: T;
  onSelect: (value: T) => void;
  label?: string;
};

const Dropdown = <T extends string | BackgroundMode>({
  options,
  selectedValue,
  onSelect,
  label,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: T) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className='dropdown-container' ref={dropdownRef}>
      <button
        className={`dropdown-button ${isOpen && 'open'}`}
        onClick={handleToggle}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-label='Toggle dropdown menu'
        type='button'
      >
        {label || (selectedValue as string)}
        <span className='dropdown-arrow'>
          <svg
            role='img'
            aria-labelledby='title'
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <span id='title'>Down</span>

            <path
              d='M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z'
              fill='#ffffff'
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className='dropdown-menu' aria-label='Dropdown menu' ref={menuRef}>
          {options.map((option) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={
                selectedValue === option.value
                  ? 'dropdown-item selected'
                  : 'dropdown-item'
              }
              aria-selected={selectedValue === option.value}
              tabIndex={-1}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
