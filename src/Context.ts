import { createContext } from "react";
import { CanvasPublicType } from "./store/canvas";

export const CanvasContext = createContext<CanvasPublicType>(null);
