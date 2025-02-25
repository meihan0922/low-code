import classNames from "classnames";
import { Component, ReactNode } from "react";
import type { CmpType } from "../../store/canvas";
import { CanvasContext } from "../../Context";

const editStyle = "box-content absolute";
const unselectedStyle = "border border-transparent";
const selectedStyle = "border border-[#02dcf7]";

// TODO: 刪除，改變層級~
// * 因為未來會太複雜，會需要很多 useCallback, useMemo，改用類組件
export default class Cmp extends Component<{
  cmp: CmpType;
  index: number;
  isSelected: boolean;
}> {
  static contextType = CanvasContext;
  context!: React.ContextType<typeof CanvasContext>;

  setSelected = () => {
    this.context.setSelectedCmpIndex(this.props.index);
  };

  // ! 紀錄拖曳的起始位置
  // * 在上層畫布當中紀錄 drop 位置，相減計算後就可以得到移動距離，就可以得知在畫布上的座標了
  onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    this.setSelected();
    const startX = e.pageX;
    const startY = e.pageY;
    console.log(
      "%csrc/components/Cmp/index.tsx:18 onDragStart",
      "color: #26bfa5;",
      startX,
      startY
    );
    /**
     * * DataTransfer物件用於拖曳並放置（拖放）進程資料。
     * * https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer
     */
    e.dataTransfer.setData("text", `${startX},${startY}`);
  };

  render(): ReactNode {
    const { style, value } = this.props.cmp;
    return (
      <div onDragStart={this.onDragStart} draggable onClick={this.setSelected}>
        {/* 組件本身 */}
        <div style={style}>{value}</div>
        {/* 組件功能和選中的樣式 */}
        <div
          className={classNames(
            editStyle,
            this.props.isSelected ? selectedStyle : unselectedStyle
          )}
          style={{
            top: style.top - 2,
            left: style.left - 2,
            width: style.width,
            height: style.height,
          }}
        ></div>
      </div>
    );
  }
}
