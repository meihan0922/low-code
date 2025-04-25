import { useCallback, useRef, useState } from "react";
import { useCanvasByContext } from "@/store/hooks";
import Cmp from "@/components/Cmp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPercent, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CmpType } from "@/store/canvas";

export default function Center(props) {
  const ref = useRef<HTMLDivElement>(null);
  const canvas = useCanvasByContext();
  const canvasData = canvas.getCanvas();
  const selectedIndex = canvas.getSelectedCmpIndex();
  const { style, cmps } = canvasData;

  // 縮放
  const [zoom, setZoom] = useState(() =>
    parseInt(canvasData.style.width) >= 800 ? 50 : 100
  );

  // 處理 LeftSide 拖曳過來的物件
  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
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
      let rawData: CmpType | string = e.dataTransfer.getData("drag-cmp");
      if (!rawData) return;

      const dragCmp = JSON.parse(rawData);

      const canvasDOMPos = {
        top: 110,
        // 因為 center 畫布有被 transform-origin 置中，所以為畫面寬度 - 畫布寬 * 放大比例 = 畫布左上角的位置
        left: document.body.clientWidth / 2 - (style.width / 2) * (zoom / 100),
      };

      const startX = canvasDOMPos.left;
      const startY = canvasDOMPos.top;

      let disX = endX - startX;
      let disY = endY - startY;

      // 對應到未被縮放的距離
      // 假設 zoom 是 50，disX = 10，對應到未被縮放的情況會是 20
      disX = disX * (100 / zoom); // disX * (1 / (zoom / 100))
      disY = disY * (100 / zoom);

      dragCmp.style.left = disX - dragCmp.style.width / 2;
      dragCmp.style.top = disY - dragCmp.style.height / 2;

      canvas.addCmp(dragCmp);
    },
    [zoom, style.width]
  );

  const allowDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

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
        case "Backspace":
          canvas.deleteSelectedCmp();
          return;
        default:
          return;
      }
      e.preventDefault();
      e.stopPropagation();
      canvas.updateSelectedCmp(newStyle);
      canvas.recordCanvasChangeHistory();
    },
    [canvas]
  );

  const canvasHeightZoom = style.height * (zoom / 100);

  return (
    <div
      ref={ref}
      id="center"
      className="py-16 min-h-inherit box-border flex justify-center flex-1 text-center bg-gray-200 focus:outline-0"
      tabIndex={0} // ! 只有部分元素（如 button, input, a）可以獲得焦點 (focus)，而想讓 div 接收 onKeyDown 事件，就必須先讓它能被聚焦，這就是 tabIndex={0} 的作用。
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      // * 由左面板拖曳元件進入時，可以自動取得焦點，才可以偵測 keydown，進行刪除元件的操作
      onDrop={() => ref.current?.focus({ preventScroll: false })}
      style={{
        height:
          canvasHeightZoom > window.innerHeight - 64 - 128 // - header - paddingY
            ? canvasHeightZoom + 128 + "px"
            : "calc(100vh - 64px)",
      }}
    >
      <div
        className="relative border-1 border-gray-200 origin-[50%_0%] shadow-2xl"
        style={{
          ...style,
          backgroundImage: `url("${canvasData.style.backgroundImage}")`,
          transform: `scale(${zoom / 100})`,
        }}
        onDrop={onDrop}
        // * 瀏覽器預設會 禁止 drop
        onDragOver={allowDrop}
      >
        {cmps.map((cmp, index) => (
          <Cmp
            key={cmp.key}
            cmp={cmp}
            index={index}
            isSelected={selectedIndex === index}
            zoom={zoom}
          />
        ))}
      </div>
      <ul className="fixed h-10 flex bottom-10 right-96 bg-white border rounded-lg border-gray-400 justify-around">
        <li
          className="pl-2 pr-1.5 text-xs flex items-center cursor-pointer"
          onClick={() => setZoom((p) => (p - 25 >= 1 ? p - 25 : 1))}
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
          onClick={() => setZoom((p) => p + 25)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </li>
      </ul>
    </div>
  );
}
