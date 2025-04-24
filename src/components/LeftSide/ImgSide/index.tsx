import { CmpType } from "@/store/canvas";
import { useCanvasByContext } from "@/store/hooks";
import { defaultCommonStyle } from "@/utils/const";

const defaultStyle = {
  ...defaultCommonStyle,
};

const settings = [
  {
    value: "https://fakeimg.pl/440x320",
    style: { ...defaultStyle, width: 440, height: 320 },
  },
  {
    value:
      "https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=Problem?%20%3C%3Apepw%3A989410572514758676%3E",
    style: { ...defaultStyle, width: 440, height: 230 },
  },
  {
    value:
      "https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=Supports%20emojis!%20%F0%9F%98%8B",
    style: { ...defaultStyle, width: 440, height: 230 },
  },
  {
    value:
      "https://fakeimg.pl/200x100/282828/eae0d0/?retina=1&text=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF&font=noto",
    style: { ...defaultStyle, width: 200, height: 100 },
  },
];

export default function DetailsList() {
  const { addCmp } = useCanvasByContext();

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
        {settings.map((item) => {
          return (
            <li
              key={item.value}
              className="cursor-pointer flex-[0_0_calc(50%-var(--spacing)*1.25)] h-20 flex items-center justify-center overflow-hidden border border-gray-200 text-center text-xl hover:font-bold hover:text-orange-400 hover:border-orange-400"
              onClick={() => addCmp({ ...item, type: "Img" })}
              onDragStart={(e) => onDragStart(e, { ...item, type: "Img" })}
            >
              <img className="w-full h-full" src={item.value} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
