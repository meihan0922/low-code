import { useCallback, useContext } from "react";
import {
  useCanvasByContext,
  useCanvasCmps,
  useCanvasData,
} from "../../store/hooks";
import Cmp from "../../components/Cmp";

export default function Center(props) {
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

  return (
    <div className="flex justify-center flex-1 min-h-full pt-16 text-center bg-gray-200">
      <div
        className="relative w-96 h-5/6 border-1 border-gray-200 bg-white shadow-2xl"
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
