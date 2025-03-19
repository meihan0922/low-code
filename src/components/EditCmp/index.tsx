import { useCanvasByContext } from "@/store/hooks";
import Item from "@/lib/Item";
import ColorPicker from "@/lib/ColorPicker";
import cx from "classnames";

const inputStyle = "px-2 py-1 rounded-lg border border-[#d6dbe1] w-full";

export default function EditCmp(props) {
  const canvas = useCanvasByContext();
  const cmp = canvas.getSelectedCmp();
  const { value, style } = cmp;
  const handleStyleChange = (e, { name, value }) => {
    const newStyle = { [name]: value };
    canvas.updateSelectedCmp(newStyle);
  };
  const handleValueChange = ({ target: { value } }) => {
    canvas.updateSelectedCmp(null, value);
  };

  console.log("style", style);
  return (
    <div className="w-80 inline-block text-center">
      <div className="h-14 text-base leading-14 border-b border-[#ddd] text-center bg-[##ffe331] text-[#500202] mb-4">
        組件屬性
      </div>
      <Item label="描述: ">
        <input
          type="text"
          className={inputStyle}
          value={value}
          onChange={handleValueChange}
        />
      </Item>
      {style.fontSize != undefined && (
        <Item label="字體大小: ">
          <input
            type="number"
            className={inputStyle}
            value={style.fontSize}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "fontSize",
                value: Number(e.target.value) + 0,
              });
            }}
          />
        </Item>
      )}
      {style.fontWeight != undefined && (
        <Item label="字體粗細: ">
          <select
            className={inputStyle}
            value={style.fontWeight}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "fontWeight",
                value: e.target.value,
              });
            }}
          >
            <option value="normal">normal</option>
            <option value="bold">bold</option>
            <option value="lighter">lighter</option>
          </select>
        </Item>
      )}
      {style.lineHeight != undefined && (
        <Item label="行高: ">
          <input
            type="number"
            className={inputStyle}
            value={parseInt(style.lineHeight)}
            onChange={(e) => {
              handleStyleChange(e, {
                name: "lineHeight",
                value: Number(e.target.value) + "px",
              });
            }}
          />
        </Item>
      )}
      {style.textAlign !== undefined && (
        <Item label="對齊: ">
          <div className="flex gap-2">
            <button
              className={cx(
                "cursor-pointer flex-1 border border-[#ccc] rounded-lg p-1 text-sm",
                {
                  "border-gray-700 border-1 text-gray-700 font-bold":
                    style.textAlign === "left",
                }
              )}
              onClick={(e) => {
                handleStyleChange(e, {
                  name: "textAlign",
                  value: "left",
                });
              }}
            >
              左
            </button>
            <button
              className={cx(
                "cursor-pointer flex-1 border border-[#ccc] rounded-lg p-1 text-sm",
                {
                  "border-gray-700 border-1 text-gray-700 font-bold":
                    style.textAlign === "center",
                }
              )}
              onClick={(e) => {
                handleStyleChange(e, {
                  name: "textAlign",
                  value: "center",
                });
              }}
            >
              中
            </button>
            <button
              className={cx(
                "cursor-pointer flex-1 border border-[#ccc] rounded-lg p-1 text-sm",
                {
                  "border-gray-700 border-1 text-gray-700 font-bold":
                    style.textAlign === "right",
                }
              )}
              onClick={(e) => {
                handleStyleChange(e, {
                  name: "textAlign",
                  value: "right",
                });
              }}
            >
              右
            </button>
          </div>
        </Item>
      )}
      {style.borderRadius !== undefined && (
        <Item label="圓角: ">
          <input
            className={inputStyle}
            type="text"
            value={style.borderRadius}
            onChange={(e) =>
              handleStyleChange(e, {
                name: "borderRadius",
                value: e.target.value,
              })
            }
          />
        </Item>
      )}
      <Item label="邊框樣式: ">
        <select
          className={inputStyle}
          value={style.borderStyle}
          onChange={(e) => {
            handleStyleChange(e, {
              name: "borderStyle",
              value: e.target.value,
            });
          }}
        >
          <option value="none">none</option>
          <option value="dashed">dashed</option>
          <option value="dotted">dotted</option>
          <option value="double">double</option>
          <option value="groove">groove</option>
          <option value="hidden">hidden</option>
          <option value="solid">solid</option>
        </select>
      </Item>
      <Item label="邊框寬度: ">
        <input
          className={inputStyle}
          type="number"
          value={style.borderWidth}
          onChange={(e) =>
            handleStyleChange(e, {
              name: "borderWidth",
              value: Number(e.target.value) + 0,
            })
          }
        />
      </Item>
      <Item label="邊框顏色: ">
        <ColorPicker
          color={style.borderColor}
          onChange={(color) =>
            handleStyleChange(color, {
              name: "borderColor",
              value: color,
            })
          }
        />
      </Item>
      {style.color !== undefined && (
        <Item label="字體顏色: ">
          <ColorPicker
            color={style.color}
            onChange={(color) =>
              handleStyleChange(color, {
                name: "color",
                value: color,
              })
            }
          />
        </Item>
      )}
      {style.backgroundColor !== undefined && (
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
      )}
    </div>
  );
}
