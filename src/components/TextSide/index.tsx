import { useCanvasByContext } from "@/store/hooks";

const defaultStyle = {
  position: "absolute",
  top: 1,
  left: 0,
  width: 80,
  height: 30,
  lineHeight: "30px",
  fontSize: 12,
  fontWeight: "normal",
  color: "#000",
  backgroundColor: "#ffffff00",
  textAlign: "left",
  borderRadius: "0%",
  borderStyle: "none",
  borderWidth: "0",
  borderColor: "#ffffff00",
};

const settings = [
  {
    value: "標題",
    style: {
      ...defaultStyle,
      fontSize: 28,
      height: 50,
      lineHeight: "50px",
    },
  },
  {
    value: "正文",
    style: defaultStyle,
  },
];

export default function DetailsList() {
  const { addCmp } = useCanvasByContext();

  return (
    <div className="z-[999] absolute top-0 left-20 w-72 h-full px-5 py-3.5 overflow-scroll shadow-lg bg-white">
      <ul className="flex flex-wrap gap-2.5">
        {settings.map((item) => {
          return (
            <li
              key={item.value}
              onClick={() => addCmp({ ...item, type: "Text" })}
              className="cursor-pointer flex-[0_0_calc(50%-var(--spacing)*1.25)] h-20 flex items-center justify-center overflow-hidden border border-gray-200 text-center text-xl hover:font-bold hover:text-orange-400 hover:border-orange-400"
            >
              {item.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
