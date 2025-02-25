import { useContext } from "react";
import { useCanvasCmps, useCanvasData } from "../../store/hooks";
import Cmp from "./Cmp";

export default function Center(props) {
  const canvas = useCanvasData();
  const { style, cmps } = canvas;

  return (
    <div className="flex justify-center flex-1 min-h-full pt-16 text-center bg-gray-200">
      <div className="relative w-96 h-5/6 border-1 border-gray-200 bg-white shadow-2xl">
        Center canvas
        {cmps.map((cmp) => (
          <Cmp key={cmp.key} cmp={cmp} />
        ))}
      </div>
    </div>
  );
}
