import { useCanvasByContext } from "@/store/hooks";

const defaultStyle = {
  position: "absolute",
  top: 1,
  left: 0,
  width: 80,
  height: 80,
  borderRadius: "0%",
  borderStyle: "none",
  borderWidth: "0",
  borderColor: "#ffffff00",
};

const settings = [
  {
    value: "https://fakeimg.pl/440x320",
    style: { ...defaultStyle, width: 440, height: 320 },
  },
  {
    value:
      "https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=Problem?%20%3C%3Apepw%3A989410572514758676%3E",
    style: { ...defaultStyle, width: 440, height: 230 },
  },
  {
    value:
      "https://fakeimg.pl/440x230/282828/eae0d0/?retina=1&text=Supports%20emojis!%20%F0%9F%98%8B",
    style: { ...defaultStyle, width: 440, height: 230 },
  },
  {
    value:
      "https://fakeimg.pl/200x100/282828/eae0d0/?retina=1&text=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF&font=noto",
    style: { ...defaultStyle, width: 200, height: 100 },
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
              onClick={() => addCmp({ ...item, type: "Img" })}
              className="cursor-pointer flex-[0_0_calc(50%-var(--spacing)*1.25)] h-20 flex items-center justify-center overflow-hidden border border-gray-200 text-center text-xl hover:font-bold hover:text-orange-400 hover:border-orange-400"
            >
              <img className="w-full h-full" src={item.value} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
