import { CmpType } from "@/store/canvas";
import { useCanvasByContext } from "@/store/hooks";
import { defaultCommonStyle } from "@/utils/const";

const defaultStyle = {
  ...defaultCommonStyle,
  width: 120,
  height: 120,
  borderColor: "blue",
  backgroundColor: "blue",
};

const settings = [
  {
    value: Math.random() + "",
    style: {
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "transparent",
    },
  },
  {
    value: Math.random() + "",
    style: defaultStyle,
  },
];

export default function GraphSide() {
  const canvas = useCanvasByContext();
  const addCmp = (_cmp: CmpType) => {
    canvas.addCmp(_cmp);
  };

  // ! 紀錄拖曳的起始位置
  const onDragStart = (e: React.DragEvent<HTMLLIElement>, _cmp: CmpType) => {
    // * 在上層畫布當中紀錄 drop 位置，相減計算後就可以得到移動距離，就可以得知在畫布上的座標了
    /**
     * * DataTransfer物件用於拖曳並放置（拖放）進程資料。
     * * https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer
     */
    e.dataTransfer.setData("drag-cmp", JSON.stringify(_cmp));
  };

  return (
    <div className="z-[999] absolute top-0 left-20 w-72 h-full px-5 py-3.5 overflow-scroll shadow-lg bg-white">
      <ul className="flex flex-wrap gap-2.5">
        {settings.map((item) => (
          <li
            key={item.value}
            className="flex-col cursor-pointer flex-[0_0_calc(50%-var(--spacing)*1.25)] h-28 flex items-center justify-center overflow-hidden border border-gray-200 text-center text-xl hover:font-bold hover:text-orange-400 hover:border-orange-400"
            style={{
              width: item.style.width,
              height: item.style.height,
              backgroundColor: item.style.backgroundColor,
              borderStyle: item.style.borderStyle,
              borderColor: item.style.borderColor,
            }}
            draggable="true"
            onClick={() => addCmp({ ...item, type: "GraphSide" })}
            onDragStart={(e) => onDragStart(e, { ...item, type: "GraphSide" })}
          ></li>
        ))}
      </ul>
    </div>
  );
}
