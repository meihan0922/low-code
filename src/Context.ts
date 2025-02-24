import { createContext } from "react";
import { CanvasPublic } from "./store/canvas";

export const CanvasContext = createContext<CanvasPublic>(null);
