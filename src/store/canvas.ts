import { useRef } from "react";
import { getOnlyKey } from "../utils";

const defaultCanvas = {
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
  //   cmps: [],

  // 仅用于测试
  cmps: [
    {
      key: getOnlyKey(),
      desc: "文本",
      value: "文本",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 100,
        height: 30,
        fontSize: 12,
        color: "red",
      },
    },
  ],
};

interface Cmps {
  cmps: any[];
  style: {};
}
interface CanvasDataType extends Cmps {}
export type CanvasPublic = ReturnType<Canvas["getPublicCanvas"]>;

export class Canvas {
  canvas: CanvasDataType;
  listeners: any;

  constructor(_canvas = defaultCanvas) {
    this.canvas = _canvas; // 畫布數據
    this.listeners = [];
  }

  getCanvas = () => {
    return { ...this.canvas };
  };

  setCanvas = (_canvas) => {
    Object.assign(this.canvas, _canvas);
  };

  // 更新畫布
  addCmp = (_cmp) => {
    const cmp = { key: getOnlyKey(), ..._cmp };
    this.canvas.cmps.push(cmp);
    console.log("this.canvas", this.canvas);
    this.updateApp();
  };

  // 更新組件
  // TODO: 待寫個別更新，先寫整個畫布更新
  updateApp = () => {
    this.listeners.forEach((update) => {
      update();
    });
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
    };
    return obj;
  };
}
