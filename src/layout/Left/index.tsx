import { JSX, useState } from "react";
import TextSide from "@/components/LeftSide/TextSide";
import ImgSide from "@/components/LeftSide/ImgSide";
import classNames from "classnames";
import type { CmpType } from "@/store/canvas";
import { useCallback, useContext, useEffect, useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import TplSide from "@/components/LeftSide/TplSide";
import GraphSide from "@/components/LeftSide/GraphSide";

type KeyType = CmpType["type"];

const CmpEnum: Record<KeyType, { text: string; cmp: JSX.Element }> = {
  Text: { text: "文字", cmp: <TextSide /> },
  Img: { text: "圖片", cmp: <ImgSide /> },
  Tpl: { text: "模板", cmp: <TplSide /> },
  GraphSide: { text: "圖形", cmp: <GraphSide /> },
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
    <div ref={ref} className="fixed bg-white h-full  top-16">
      <ul className="w-20">
        {Object.entries(CmpEnum).map(([key, { text }]) => {
          return (
            <li
              key={key}
              className={classNames(liStyle, {
                [liSelectedStyle]: showSide === key,
              })}
              onClick={() => setShowSide(key as keyof typeof CmpEnum)}
            >
              <span>{text}</span>
            </li>
          );
        })}
      </ul>
      {showSide && <div className="z-20">{CmpEnum[showSide].cmp}</div>}
    </div>
  );
}
