import { useState } from "react";
import DetailsList from "../../components/DetailsList";

export default function Left(props) {
  const [showSide, setShowSide] = useState<boolean>(false);

  return (
    <div className="relative">
      <ul className="w-20">
        <li
          className="flex flex-col items-center mt-2.5 cursor-pointer hover:box-border hover:border-l-4 hover:border-l-blue-400 group"
          onClick={() => setShowSide(!showSide)}
        >
          <span className="group-hover:text-blue-400 text-[#666]">文本</span>
        </li>
      </ul>
      {/* <span className="inline-block w-8 h-8 leading-6 text-[#181819] text-2xl">
        icon
      </span> */}
      {showSide && <DetailsList />}
    </div>
  );
}
