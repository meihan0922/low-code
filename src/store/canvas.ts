import { StyleHTMLAttributes, useRef } from "react";
import { getOnlyKey } from "../utils";

function getDefaultCanvas() {
  const defaultCanvas: CmpsType = {
    // 畫布樣式
    style: {
      width: 320,
      height: 568,
      backgroundColor: "#ffffff",
      backgroundImage: "",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      boxSizing: "content-box",
      transition: "transform 0.3s ease",
    },
    // 组件
    cmps: [],

    // cmps: [
    //   {
    //     key: getOnlyKey(),
    //     desc: "文本",
    //     value: "文本",
    //     style: {
    //       position: "absolute",
    //       top: 0,
    //       left: 0,
    //       width: 100,
    //       height: 30,
    //       fontSize: 12,
    //       color: "red",
    //     },
    //   },
    // ],
  };
  return defaultCanvas;
}

type BaseCmpType = {
  key?: number;
  style?: Record<string, any>;
};

export type CmpType =
  | (BaseCmpType & { type: "Text"; value: string | number | null })
  | (BaseCmpType & { type: "Img"; value: string })
  | (BaseCmpType & { type: "Tpl"; value: string })
  | (BaseCmpType & { type: "GraphSide"; value: string });

export type CmpsType = {
  cmps: CmpType[];
  style: Record<string, any>;
};

interface ICanvasDataType extends CmpsType {}
export type CanvasPublicType = ReturnType<Canvas["getPublicCanvas"]>;

export class Canvas {
  canvas: ICanvasDataType;
  listeners: (() => void)[];
  selectedCmpIndex: number;
  canvasChangeHistory: string[];
  canvasChangeHistoryIndex: number;
  maxCanvasChangeHistoryMount: number;

  constructor(_canvas = getDefaultCanvas()) {
    this.canvas = _canvas; // 畫布數據
    this.selectedCmpIndex = null;
    this.listeners = [];

    // 更動畫布歷史
    this.canvasChangeHistory = [JSON.stringify(this.canvas)];
    // 前進、後退
    this.canvasChangeHistoryIndex = 0;
    // 最多紀錄歷史數量
    this.maxCanvasChangeHistoryMount = 20;
  }

  recordCanvasChangeHistory = () => {
    // 回推上一步或是下一步，canvasChangeHistoryIndex 改變指向某位置，直接在下一個位置放入當前的狀態
    // 後面的直接捨棄
    this.canvasChangeHistory[++this.canvasChangeHistoryIndex] = JSON.stringify(
      this.canvas
    );
    // 只保留 0 至新的操作位置
    this.canvasChangeHistory = this.canvasChangeHistory.slice(
      0,
      this.canvasChangeHistoryIndex + 1
    );
    // 最多紀錄 maxCanvasChangeHistoryMount 數據，多的前面就捨棄
    if (this.canvasChangeHistory.length > this.maxCanvasChangeHistoryMount) {
      this.canvasChangeHistory.shift();
      this.canvasChangeHistoryIndex--;
    }
  };

  goPrevCanvasHistory = () => {
    let newIndex = this.canvasChangeHistoryIndex - 1;
    if (newIndex < 0) newIndex = 0;
    // 都是0，無從倒退
    if (newIndex === this.canvasChangeHistoryIndex) return;

    this.canvasChangeHistoryIndex = newIndex;
    const newCanvas = JSON.parse(this.canvasChangeHistory[newIndex]);
    this.canvas = newCanvas;
    this.updateApp();
  };

  goNextCanvasHistory = () => {
    let newIndex = this.canvasChangeHistoryIndex + 1;
    if (newIndex >= this.canvasChangeHistory.length)
      newIndex = this.canvasChangeHistory.length - 1;
    // 都是最後一個，無從前進
    if (newIndex === this.canvasChangeHistoryIndex) return;

    this.canvasChangeHistoryIndex = newIndex;
    const newCanvas = JSON.parse(this.canvasChangeHistory[newIndex]);
    this.canvas = newCanvas;
    this.updateApp();
  };

  getCanvas = () => {
    return { ...this.canvas };
  };

  getSelectedCmpIndex = () => {
    return this.selectedCmpIndex;
  };

  getSelectedCmp = () => {
    return this.getCanvasCmps()[this.selectedCmpIndex];
  };

  setSelectedCmpIndex = (index: number) => {
    if (this.selectedCmpIndex === index) return;
    this.selectedCmpIndex = index;
    this.updateApp();
  };

  setCanvas = (_canvas?: ICanvasDataType) => {
    if (!_canvas) {
      this.canvas = getDefaultCanvas();
    } else {
      Object.assign(this.canvas, _canvas);
    }
    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  updateCanvasStyle = (newStyle: Record<string, any>) => {
    this.canvas.style = {
      ...this.canvas.style,
      ...newStyle,
    };
    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  // 更新畫布
  addCmp = (_cmp: CmpType) => {
    const cmp = { key: getOnlyKey(), ..._cmp };
    this.canvas.cmps.push(cmp);
    // 預設新增的組件為『選中的組件』
    this.selectedCmpIndex = this.canvas.cmps.length - 1;
    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  deleteSelectedCmp = () => {
    this.canvas.cmps.splice(this.selectedCmpIndex, 1);
    this.selectedCmpIndex = undefined;
    this.updateApp();
    this.recordCanvasChangeHistory();
  };

  // 更新組件
  // TODO: 待寫個別更新，先寫整個畫布更新
  updateApp = () => {
    this.listeners.forEach((update) => {
      update();
    });
  };

  updateSelectedCmp = (newStyle?, newValue?) => {
    const cmp = this.getSelectedCmp();
    if (newStyle && this.canvas.cmps[this.getSelectedCmpIndex()]?.style) {
      this.canvas.cmps[this.getSelectedCmpIndex()].style = {
        ...(cmp?.style || {}),
        ...newStyle,
      };
    }

    if (newValue !== undefined) {
      this.canvas.cmps[this.getSelectedCmpIndex()].value = newValue;
    }

    this.updateApp();
  };

  subscribe = (listener) => {
    this.listeners.push(listener);
    return () => this.listeners.filter((lis) => lis !== listener);
  };

  // 拿到所有組件
  getCanvasCmps = () => {
    return [...this.canvas.cmps];
  };

  getPublicCanvas = () => {
    const obj = {
      getCanvas: this.getCanvas,
      getCanvasCmps: this.getCanvasCmps,
      addCmp: this.addCmp,
      subscribe: this.subscribe,
      getSelectedCmpIndex: this.getSelectedCmpIndex,
      setSelectedCmpIndex: this.setSelectedCmpIndex,
      updateSelectedCmp: this.updateSelectedCmp,
      getSelectedCmp: this.getSelectedCmp,
      updateCanvasStyle: this.updateCanvasStyle,
      setCanvas: this.setCanvas,
      deleteSelectedCmp: this.deleteSelectedCmp,
      goPrevCanvasHistory: this.goPrevCanvasHistory,
      goNextCanvasHistory: this.goNextCanvasHistory,
      recordCanvasChangeHistory: this.recordCanvasChangeHistory,
    };
    return obj;
  };
}
