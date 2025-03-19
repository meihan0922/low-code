import { JSX, useState } from "react";
import TextSide from "@/components/TextSide";
import ImgSide from "@/components/ImgSide";
import classNames from "classnames";
import type { CmpType } from "@/store/canvas";
import { useCallback, useContext, useEffect, useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";

type KeyType = CmpType["type"];

const CmpEnum: Record<KeyType, () => JSX.Element> = {
  Text: TextSide,
  Img: ImgSide,
} as const;

const liStyle =
  "flex flex-col items-center mt-2.5 cursor-pointer hover:box-border hover:border-l-4 hover:border-l-blue-400 group text-[#666]";
const liSelectedStyle = "box-border border-l-4 border-l-blue-400 text-blue-400";

export default function Left(props) {
  const [showSide, setShowSide] = useState<keyof typeof CmpEnum>();

  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setShowSide(undefined);
  }, []);
  useClickOutside(ref, close);

  return (
    <div ref={ref} className="relative">
      <ul className="w-20">
        <li
          className={classNames(liStyle, {
            [liSelectedStyle]: showSide === "Text",
          })}
          onClick={() => setShowSide("Text")}
        >
          <span>文本</span>
        </li>
        <li
          className={classNames(liStyle, {
            [liSelectedStyle]: showSide === "Img",
          })}
          onClick={() => setShowSide("Img")}
        >
          <span>圖片</span>
        </li>
      </ul>
      {showSide && <div className="z-20">{CmpEnum[showSide]()}</div>}
    </div>
  );
}

{
  /* <span className="inline-block w-8 h-8 leading-6 text-[#181819] text-2xl">
  icon
</span> */
}
