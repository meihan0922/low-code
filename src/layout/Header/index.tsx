import { useCanvasByContext } from "@/store/hooks";
import { faFloppyDisk, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header(props) {
  const canvas = useCanvasByContext();
  const save = () => {
    const data = canvas.getCanvas();
    console.log("data", data, JSON.stringify(data));
  };
  return (
    <div className="z-20 h-16 flex justify-between px-8 leading-16 text-center text-white bg-black">
      <div className="flex gap-1.5 cursor-pointer" onClick={save}>
        <span>
          <FontAwesomeIcon icon={faFloppyDisk} />
        </span>
        <span>保存</span>
      </div>
      <div className="flex gap-1.5 cursor-pointer">
        <span>
          <FontAwesomeIcon icon={faUpload} />
        </span>
        <span>發佈</span>
      </div>
    </div>
  );
}
