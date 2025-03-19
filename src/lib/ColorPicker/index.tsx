import { useCallback, useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { HexColorPicker } from "react-colorful";

const ColorPicker = ({ color, onChange }) => {
  const popover = useRef(undefined);

  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="relative">
      <div className="w-9 h-9 rounded-md border-1 border-[#d6dbe1] flex align-middle inset-shadow-black inset-1">
        <div
          className="w-7 h-7 rounded-lg border-1 border-[#d6dbe1] cursor-pointer m-auto "
          style={{ backgroundColor: color }}
          onClick={() => toggle(true)}
        />
      </div>

      {isOpen && (
        <div
          className="absolute top-[calc(100%+var(--spacing)*0.5)] left-0 rounded-lg bg-white p-2 border-1 border-[#d6dbe1] z-10"
          ref={popover}
        >
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
