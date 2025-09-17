/** biome-ignore-all lint/a11y: no a11y for now  */

import UI from '@components/ui';
import { ChevronDown16Filled } from '@fluentui/react-icons';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Context
type DropdownContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
};

const DropdownContext = createContext<DropdownContextType>({
  open: false,
  setOpen: () => {},
  buttonRef: { current: null },
});

// Dropdown Root
type DropdownProps = {
  children: React.ReactNode;
};

const Dropdown = ({ children }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <DropdownContext.Provider value={{ open, setOpen, buttonRef }}>
      <div ref={dropdownRef} className="dropdown">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Dropdown Button
type DropdownButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
};

function DropdownButton({ children }: DropdownButtonProps) {
  const { open, setOpen, buttonRef } = useContext(DropdownContext);

  const toggleOpen = () => setOpen(!open);

  return (
    <UI.Tippy label={open ? 'Close' : 'Open'}>
      <button ref={buttonRef} onClick={toggleOpen} className="dropdown-button" type="button">
        {children}
        <ChevronDown16Filled className={`dropdown-icon ${open ? 'rotate' : ''}`} />
      </button>
    </UI.Tippy>
  );
}

type DropdownContentProps = {
  children: React.ReactNode;
};

function DropdownContent({ children }: DropdownContentProps) {
  const { open, buttonRef, setOpen } = useContext(DropdownContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);

  const updatePosition = () => {
    const button = buttonRef.current;
    const content = contentRef.current;

    if (button && content) {
      const buttonRect = button.getBoundingClientRect();
      const contentWidth = content.offsetWidth || buttonRect.width;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      let left = buttonCenterX - contentWidth / 2;
      let top = buttonRect.bottom + window.scrollY;

      left = Math.max(8, Math.min(left + window.scrollX, viewportWidth - contentWidth - 8));

      const contentHeight = content.offsetHeight;
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if (spaceBelow < contentHeight && spaceAbove > contentHeight) {
        top = buttonRect.top + window.scrollY - contentHeight;
      }

      setCoords({
        top,
        left,
        width: contentWidth,
      });

      setReady(true);
      requestAnimationFrame(() => setShow(true));
    }
  };

  useEffect(() => {
    document.body.classList.toggle('dropdown-open', open);
  }, [open]);

  useEffect(() => {
    if (open) {
      setReady(false);
      setShow(false);
      updatePosition();

      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="GenericModal__overlay lyrics-modal dropdown-overlay"
      onClick={() => setOpen(false)}
    >
      <div
        ref={contentRef}
        className={`dropdown-content ${ready && show ? 'visible' : ''}`}
        style={{
          top: coords.top,
          left: coords.left,
          minWidth: coords.width,
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

// Dropdown List
type DropdownListProps = React.HTMLAttributes<HTMLUListElement> & {
  children: React.ReactNode;
};

function DropdownList({ children, ...props }: DropdownListProps) {
  const { setOpen } = useContext(DropdownContext);

  return (
    <ul onClick={() => setOpen(false)} className="dropdown-list" {...props}>
      {children}
    </ul>
  );
}

// Dropdown Item
type DropdownItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

function DropdownItem({ children, ...props }: DropdownItemProps) {
  return (
    <li className="dropdown-item">
      <button className="dropdown-item-button" {...props}>
        {children}
      </button>
    </li>
  );
}

// Attach subcomponents
Dropdown.Button = DropdownButton;
Dropdown.Content = DropdownContent;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

export default Dropdown;
