import { JSX, useState } from "react";
import TextSide from "@/components/LeftSide/TextSide";
import ImgSide from "@/components/LeftSide/ImgSide";
import classNames from "classnames";
import type { CmpType } from "@/store/canvas";
import { useCallback, useContext, useEffect, useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import TplSide from "@/components/LeftSide/TplSide";
import GraphSide from "@/components/LeftSide/GraphSide";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faImages,
  faHeader,
  faTableCellsLarge,
  faShapes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type KeyType = CmpType["type"];

const CmpEnum: Record<
  KeyType,
  { text: string; cmp: JSX.Element; icon: IconDefinition }
> = {
  Text: { text: "文字", cmp: <TextSide />, icon: faHeader },
  Img: { text: "圖片", cmp: <ImgSide />, icon: faImages },
  Tpl: { text: "模板", cmp: <TplSide />, icon: faTableCellsLarge },
  GraphSide: { text: "圖形", cmp: <GraphSide />, icon: faShapes },
} as const;

const liStyle =
  "flex flex-col items-center mt-2.5 gap-1 cursor-pointer hover:box-border hover:border-l-4 hover:border-l-blue-400 group text-[#666]";
const liSelectedStyle = "box-border border-l-4 border-l-blue-400 text-blue-400";

export default function Left(props) {
  const [showSide, setShowSide] = useState<keyof typeof CmpEnum | false>(false);

  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setShowSide(false);
  }, []);

  useClickOutside(ref, close);

  return (
    <div ref={ref} className="fixed bg-white h-full top-16 py-3">
      <ul className="w-20 flex flex-col gap-2.5">
        {Object.entries(CmpEnum).map(([key, { text, icon }]) => {
          return (
            <li
              key={key}
              className={classNames(liStyle, {
                [liSelectedStyle]: showSide === key,
              })}
              onClick={() => setShowSide(key as keyof typeof CmpEnum)}
            >
              <FontAwesomeIcon icon={icon} className="text-2xl" />
              <span className="text-xs">{text}</span>
            </li>
          );
        })}
      </ul>
      {showSide && <div className="z-20">{CmpEnum[showSide].cmp}</div>}
    </div>
  );
}
