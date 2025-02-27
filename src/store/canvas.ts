import { useRef } from "react";
import { getOnlyKey } from "../utils";

const defaultCanvas: CmpsType = {
  // 畫布樣式
  style: {
    width: 320,
    height: 568,
    backgroundColor: "#ffffff00",
    backgroundImage: "",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    boxSizing: "content-box",
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

type BaseCmpType = {
  key?: number;
  style?: Record<string, any>;
};

export type CmpType =
  | (BaseCmpType & { type: "Text"; value: string | number | null })
  | (BaseCmpType & { type: "Img"; value: string });

export type CmpsType = {
  cmps: CmpType[];
  style: {};
};

interface ICanvasDataType extends CmpsType {}
export type CanvasPublicType = ReturnType<Canvas["getPublicCanvas"]>;

export class Canvas {
  canvas: ICanvasDataType;
  listeners: (() => void)[];
  selectedCmpIndex: number;

  constructor(_canvas = defaultCanvas) {
    this.canvas = _canvas; // 畫布數據
    this.selectedCmpIndex = null;
    this.listeners = [];
  }

  getCanvas = () => {
    return { ...this.canvas };
  };

  getSelectedCmpIndex = () => {
    return this.selectedCmpIndex;
  };

  getSelectedCmp = () => {
    return this.getCanvasCmps()[this.selectedCmpIndex];
  };

  setSelectedCmpIndex = (index) => {
    if (this.selectedCmpIndex === index) return;
    this.selectedCmpIndex = index;
    this.updateApp();
  };

  setCanvas = (_canvas) => {
    Object.assign(this.canvas, _canvas);
  };

  // 更新畫布
  addCmp = (_cmp: CmpType) => {
    const cmp = { key: getOnlyKey(), ..._cmp };
    this.canvas.cmps.push(cmp);
    // 預設新增的組件為『選中的組件』
    this.selectedCmpIndex = this.canvas.cmps.length - 1;
    this.updateApp();
  };

  // 更新組件
  // TODO: 待寫個別更新，先寫整個畫布更新
  updateApp = () => {
    this.listeners.forEach((update) => {
      update();
    });
  };

  updateSelectedCmp = (newStyle = {}, newValue?) => {
    const comp = this.getSelectedCmp();
    Object.assign(comp, {
      style: { ...comp.style, ...newStyle },
      // TODO: 更改 value
      // value:
    });
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
    };
    return obj;
  };
}
