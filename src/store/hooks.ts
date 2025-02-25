import { useContext, useRef } from "react";
import { CanvasContext } from "../Context";
import { Canvas } from "./canvas";
import type { CanvasPublicType } from "./canvas";

export function useCanvas(canvas?: CanvasPublicType) {
  const ref = useRef<CanvasPublicType>(null);

  if (!ref.current) {
    if (canvas) {
      ref.current = canvas;
    } else {
      ref.current = new Canvas().getPublicCanvas();
    }
  }

  return ref.current;
}

// 獲取操作
export function useCanvasByContext() {
  const context = useContext(CanvasContext);
  return context;
}

// 獲取數據
export function useCanvasData() {
  const canvas = useContext(CanvasContext);

  return canvas.getCanvas();
}

// 獲取元件
export function useCanvasCmps() {
  const canvas = useContext(CanvasContext);

  return canvas.getCanvasCmps();
}
