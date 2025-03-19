import { useCanvasByContext } from "@/store/hooks";
import ColorPicker from "@/lib/ColorPicker";
import Item from "@/lib/Item";

const inputStyle = "px-2 py-1 rounded-lg border border-[#d6dbe1] w-full";

export default function EditCanvas() {
  const canvas = useCanvasByContext();
  const style = canvas.getCanvas().style;
  const handleStyleChange = (e, { name, value }) => {
    canvas.updateCanvasStyle({ [name]: value });
  };

  return (
    <div className="w-80 inline-block text-center">
      <div className="h-14 text-base leading-14 border-b border-[#ddd] text-center bg-[##ffe331] text-[#500202] mb-4">
        畫布屬性
      </div>
      <Item label="畫布寬度: ">
        <div className="flex gap-1 after:content-['px']">
          <input
            type="number"
            className={inputStyle}
            value={style.width}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "width",
                value: Number(e.target.value),
              });
            }}
          />
        </div>
      </Item>
      <Item label="畫布高度: ">
        <div className="flex gap-1 after:content-['px']">
          <input
            type="number"
            className={inputStyle}
            value={style.height}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "height",
                value: Number(e.target.value),
              });
            }}
          />
        </div>
      </Item>
      <Item label="背景顏色: ">
        <ColorPicker
          color={style.backgroundColor}
          onChange={(color) =>
            handleStyleChange(color, {
              name: "backgroundColor",
              value: color,
            })
          }
        />
      </Item>
      <Item label="背景圖片: ">
        <input
          type="text"
          className={inputStyle}
          value={style.backgroundImage}
          onChange={(e) => {
            handleStyleChange(e, {
              name: "backgroundImage",
              value: e.target.value,
            });
          }}
        />
      </Item>
    </div>
  );
}
