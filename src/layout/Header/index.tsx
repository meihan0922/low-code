import { useCanvasByContext } from "@/store/hooks";
import {
  faFloppyDisk,
  faUpload,
  faEraser,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header(props) {
  const canvas = useCanvasByContext();
  const save = () => {
    const data = canvas.getCanvas();
    // console.log("data", data, JSON.stringify(data));
  };

  const emptyCanvas = () => canvas.setCanvas();

  return (
    <div className="fixed w-full z-20 h-16 flex justify-between px-8 leading-16 text-center text-white bg-black">
      <div className="flex gap-6">{/* TODO: 待放logo */}</div>
      <div className="flex gap-6 items-center">
        {/* 上一步 */}
        <FontAwesomeIcon
          icon={faRotateLeft}
          className="text-2xl cursor-pointer"
          onClick={emptyCanvas}
        />
        {/* 下一步 */}
        <FontAwesomeIcon
          icon={faRotateRight}
          className="text-2xl cursor-pointer"
          onClick={emptyCanvas}
        />
        {/* 清空 */}
        <FontAwesomeIcon
          icon={faEraser}
          className="text-2xl cursor-pointer"
          onClick={emptyCanvas}
        />
        {/* 上傳 */}
        <FontAwesomeIcon icon={faUpload} className="text-2xl cursor-pointer" />
        {/* 儲存 */}
        <FontAwesomeIcon
          icon={faFloppyDisk}
          className="text-2xl cursor-pointer"
          onClick={save}
        />
      </div>
    </div>
  );
}
