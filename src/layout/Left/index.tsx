import { JSX, useState } from "react";
import TextSide from "@/components/LeftSide/TextSide";
import ImgSide from "@/components/LeftSide/ImgSide";
import classNames from "classnames";
import type { CmpType } from "@/store/canvas";
import { useCallback, useContext, useEffect, useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import TplSide from "@/components/LeftSide/TplSide";

type KeyType = CmpType["type"];

const CmpEnum: Record<KeyType, JSX.Element> = {
  Text: <TextSide />,
  Img: <ImgSide />,
  Tpl: <TplSide />,
} as const;

const liStyle =
  "flex flex-col items-center mt-2.5 cursor-pointer hover:box-border hover:border-l-4 hover:border-l-blue-400 group text-[#666]";
const liSelectedStyle = "box-border border-l-4 border-l-blue-400 text-blue-400";

export default function Left(props) {
  const [showSide, setShowSide] = useState<keyof typeof CmpEnum | false>(false);

  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setShowSide(false);
  }, []);

  useClickOutside(ref, close);

  return (
    <div ref={ref} className="relative">
      <ul className="w-20">
        <li
          className={classNames(liStyle, {
            [liSelectedStyle]: showSide === "Tpl",
          })}
          onClick={() => setShowSide("Tpl")}
        >
          <span>模板</span>
        </li>
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
      {showSide && <div className="z-20">{CmpEnum[showSide]}</div>}
    </div>
  );
}
