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

class Canvas {
  canvas: CanvasDataType;

  constructor(_canvas = defaultCanvas) {
    this.canvas = _canvas; // 畫布數據
  }

  getCanvas = () => {
    return { ...this.canvas };
  };

  setCanvas = (_canvas) => {
    Object.assign(this.canvas, _canvas);
  };

  // 拿到所有組件
  getCanvasCmps = () => {
    return [...this.canvas.cmps];
  };

  getPublicCanvas = () => {
    const obj = {
      getCanvas: this.getCanvas,
      getCanvasCmps: this.getCanvasCmps,
    };
    return obj;
  };
}

function useCanvas(canvas?: CanvasPublic) {
  const ref = useRef<CanvasPublic>(null);

  if (!ref.current) {
    if (canvas) {
      ref.current = canvas;
    } else {
      ref.current = new Canvas().getPublicCanvas();
    }
  }

  return ref.current;
}

export { useCanvas };
