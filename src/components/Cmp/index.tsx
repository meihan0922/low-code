import classNames from "classnames";
import { Component, ReactNode } from "react";
import type { CmpType } from "../../store/canvas";
import { CanvasContext } from "../../Context";

const editStyle = "box-content absolute";
const unselectedStyle = "border border-transparent";
const selectedStyle = "border border-[#02dcf7]";
const stretchDotStyle =
  "z-[999] absolute w-2 h-2 bg-[#00b3ff] rounded-full border border-transparent box-content hover:border-[#00b3ff] hover:bg-white";

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
    /**
     * * DataTransfer物件用於拖曳並放置（拖放）進程資料。
     * * https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer
     */
    e.dataTransfer.setData("text", `${startX},${startY}`);
  };

  onMouseDown = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const dir = e.target instanceof HTMLElement && e.target?.dataset.direction;
    if (!dir) return;
    e.stopPropagation();
    e.preventDefault();
    // 拖動前位置
    let startX = e.pageX;
    let startY = e.pageY;

    // 暫時的結束位置
    const move = (e: MouseEvent) => {
      const { cmp } = this.props;
      const { style } = cmp;
      const x = e.pageX;
      const y = e.pageY;
      let disX = x - startX;
      let disY = y - startY;
      let newStyle: Record<string, any> = {};

      // 只有左邊發生變化才會動到 left，需要減去移動距離才是真正的位置
      if (dir.indexOf("left") >= 0) {
        disX = 0 - disX;
        newStyle.left = style.left - disX;
      }
      // 只有上方發生變化才會動到 top，需要減去移動距離才是真正的位置
      if (dir.indexOf("top") >= 0) {
        disY = 0 - disY;
        newStyle.top = style.top - disY;
      }

      Object.assign(newStyle, {
        width: style.width + disX,
        height: style.height + disY,
      });

      this.context.updateSelectedCmp(newStyle);
      startX = x;
      startY = y;
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  render(): ReactNode {
    const { style, value } = this.props.cmp;
    const { width, height } = style;
    return (
      <div onDragStart={this.onDragStart} draggable onClick={this.setSelected}>
        {/* 組件本身 */}
        <div style={style}>{value}</div>
        {/* 組件功能和選中的樣式 */}
        <ul
          className={classNames(
            editStyle,
            this.props.isSelected ? selectedStyle : unselectedStyle
          )}
          style={{
            top: style.top - 1,
            left: style.left - 1,
            width: style.width,
            height: style.height,
          }}
          onMouseDown={this.onMouseDown}
        >
          <li
            className={stretchDotStyle}
            style={{ top: -4, left: -4 }}
            data-direction="top left"
          />
          <li
            className={stretchDotStyle}
            style={{ top: -4, left: width / 2 - 4 }}
            data-direction="top"
          />
          <li
            className={stretchDotStyle}
            style={{ top: -4, left: width - 4 }}
            data-direction="top right"
          />
          <li
            className={stretchDotStyle}
            style={{ top: height / 2 - 4, left: width - 4 }}
            data-direction="right"
          />
          <li
            className={stretchDotStyle}
            style={{ top: height - 4, left: width - 4 }}
            data-direction="bottom right"
          />
          <li
            className={stretchDotStyle}
            style={{ top: height - 4, left: width / 2 - 4 }}
            data-direction="bottom"
          />
          <li
            className={stretchDotStyle}
            style={{ top: height - 4, left: -4 }}
            data-direction="bottom left"
          />
          <li
            className={stretchDotStyle}
            style={{ top: height / 2 - 4, left: -4 }}
            data-direction="left"
          />
        </ul>
      </div>
    );
  }
}
