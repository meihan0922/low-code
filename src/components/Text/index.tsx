import { CmpType } from "../../store/canvas";

export default function Text({ value }: Extract<CmpType, { type: "Text" }>) {
  return value;
}
