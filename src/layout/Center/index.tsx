import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  useCanvasByContext,
  useCanvasCmps,
  useCanvasData,
} from "@/store/hooks";
import Cmp from "@/components/Cmp";
import useClickOutside from "@/hooks/useClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPercent, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Center(props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const canvas = useCanvasByContext();
  const canvasData = canvas.getCanvas();
  const { style, cmps } = canvasData;

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    /**
     * * 在瀏覽器中，會需要去關閉 onDragOver 的默認事件，才會觸發 onDrop，這是因為在某些瀏覽器中，拖放文件可能會導致打開某文件！
     */
    const endX = e.pageX;
    const endY = e.pageY;
    /**
     * * DataTransfer物件用於拖曳並放置（拖放）進程資料。
     * * https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer
     * 從 Cmp 的 onDragStart 取得起始座標 startX, startY
     */
    const [startX, startY] = e.dataTransfer.getData("text").split(",");
    const disX = endX - Number(startX);
    const disY = endY - Number(startY);

    const selectedCmp = canvas.getSelectedCmp();
    const oldStyle = selectedCmp.style;
    const left = disX + oldStyle.left;
    const top = disY + oldStyle.top;

    canvas.updateSelectedCmp({ top, left });
  }, []);

  const allowDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => e.preventDefault(),
    []
  );

  const selectedIndex = canvas.getSelectedCmpIndex();

  const handleClick = useCallback(() => canvas.setSelectedCmpIndex(-1), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const selectedCmp = canvas.getSelectedCmp();
      if (!selectedCmp) return;

      const { top, left } = selectedCmp.style;
      const newStyle: Record<string, number> = {};

      switch (e.key) {
        case "ArrowDown":
          newStyle.top = top + 1;
          break;
        case "ArrowUp":
          newStyle.top = top - 1;
          break;
        case "ArrowLeft":
          newStyle.left = left - 1;
          break;
        case "ArrowRight":
          newStyle.left = left + 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      e.stopPropagation();
      canvas.updateSelectedCmp(newStyle);
    },
    [canvas]
  );

  // 縮放
  const [zoom, setZoom] = useState(() =>
    parseInt(canvasData.style.width) >= 800 ? 50 : 100
  );

  // 重新計算 wrapper 尺寸與內容平移
  useLayoutEffect(() => {
    if (contentRef.current && wrapperRef.current) {
      const scale = zoom / 100;

      const content = contentRef.current;
      const rect = content.getBoundingClientRect();

      const p = Math.abs(scale - 1) * rect.height * 0.25;
      // 設定 wrapper 高度為內容高度 * scale
      wrapperRef.current.style.height = `${
        (scale > 1 ? rect.height * scale : rect.height) + (p > 200 ? p : 200)
      }px`;
      const percent = (scale - 1) * 50;
      // 平移讓內容不會被 scale 壓到左上角
      content.style.transform = `scale(${scale}) translate(${-percent}%, ${
        scale > 1 && p > 100 ? p + "px" : "100px"
      })`;
      content.style.transformOrigin = "top left";
    }
  }, [zoom, canvasData.style.width]);

  return (
    <div
      ref={ref}
      id="center"
      className="h-full overflow-scroll flex justify-center flex-1 text-center bg-gray-200 focus:outline-0"
      tabIndex={0} // ! 只有部分元素（如 button, input, a）可以獲得焦點 (focus)，而想讓 div 接收 onKeyDown 事件，就必須先讓它能被聚焦，這就是 tabIndex={0} 的作用。
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      <div ref={wrapperRef} style={{ minHeight: "100%" }}>
        <div
          className="border-1 border-gray-200 shadow-2xl"
          ref={contentRef}
          style={{
            ...style,
            backgroundImage: `url("${canvasData.style.backgroundImage}")`,
          }}
          onDrop={onDrop}
          onDragOver={allowDrop}
        >
          {cmps.map((cmp, index) => (
            <Cmp
              key={cmp.key}
              cmp={cmp}
              index={index}
              isSelected={selectedIndex === index}
            />
          ))}
        </div>
      </div>
      <ul className="fixed h-10 flex bottom-10 right-96 bg-white border rounded-lg border-gray-400 justify-around">
        <li
          className="pl-2 pr-1.5 text-xs flex items-center cursor-pointer"
          onClick={() => setZoom((p) => p - 10)}
        >
          <FontAwesomeIcon icon={faMinus} />
        </li>
        <li className="border-r border-l flex-1 flex items-center border-gray-400">
          <input
            className="w-10 text-right"
            type="num"
            value={zoom}
            onChange={(e) => {
              let newValue = Number(e.target.value);
              newValue = newValue >= 1 ? newValue : 1;
              setZoom(newValue - 0);
            }}
          />
          <FontAwesomeIcon icon={faPercent} className="px-2 text-xs" />
        </li>
        <li
          className="pr-2 pl-1.5 text-xs flex items-center cursor-pointer"
          onClick={() => setZoom((p) => p + 10)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </li>
      </ul>
    </div>
  );
}
