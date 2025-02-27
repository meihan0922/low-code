import { CmpType } from "../../store/canvas";

export default function Img({ value }: Extract<CmpType, { type: "Img" }>) {
  return <img className="w-full h-full" src={value} />;
}
