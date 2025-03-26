import { useCallback, useContext, useEffect, useRef } from "react";
import {
  useCanvasByContext,
  useCanvasCmps,
  useCanvasData,
} from "@/store/hooks";
import Cmp from "@/components/Cmp";
import useClickOutside from "@/hooks/useClickOutside";

export default function Center(props) {
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
    console.log(
      "%cdis",
      "color: white; background-color: #007acc;",
      top,
      left,
      oldStyle.left,
      oldStyle.top
    );
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

  return (
    <div
      ref={ref}
      id="center"
      className="flex justify-center flex-1 min-h-full pt-16 text-center bg-gray-200 focus:outline-0"
      tabIndex={0} // ! 只有部分元素（如 button, input, a）可以獲得焦點 (focus)，而想讓 div 接收 onKeyDown 事件，就必須先讓它能被聚焦，這就是 tabIndex={0} 的作用。
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      <div
        className="relative border-1 border-gray-200 shadow-2xl"
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
  );
}
