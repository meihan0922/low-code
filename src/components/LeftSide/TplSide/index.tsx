import { useCanvasByContext } from "@/store/hooks";
import { defaultCommonStyle } from "@/utils/const";

const defaultStyle = {
  ...defaultCommonStyle,
};

const settings = [
  {
    key: 0,
    desc: "《精通React》",
    img: "https://fakeimg.pl/440x320",
    data: '{"style":{"width":800,"height":3000,"backgroundColor":"#4400b9","backgroundImage":"","backgroundPosition":"center","backgroundSize":"cover","backgroundRepeat":"no-repeat","boxSizing":"content-box"},"cmps":[{"key":0.46365164238209244,"value":"https://fakeimg.pl/798x844","style":{"position":"absolute","top":0,"left":0,"width":798,"height":844,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":0},"type":2},{"key":0.7349032473153161,"value":"《精通React》","style":{"position":"absolute","top":92,"left":2,"width":774,"height":174,"borderRadius":"0%","borderStyle":"none","borderWidth":"0","borderColor":"#ffffff00","transform":"-15","lineHeight":"174px","fontSize":104,"fontWeight":"bold","color":"#ffffff","backgroundColor":"#ffffff00","textAlign":"center"},"type":1}]}',
  },
];

export default function TplSide() {
  const canvas = useCanvasByContext();
  const setCanvas = (_cmp) => {
    canvas.setCanvas(JSON.parse(_cmp));
  };

  return (
    <div className="z-[999] absolute top-0 left-20 w-72 h-full px-5 py-3.5 overflow-scroll shadow-lg bg-white">
      <ul className="flex flex-wrap gap-2.5">
        {settings.map((i) => {
          return (
            <li
              key={i.key}
              className="flex-col cursor-pointer flex-[0_0_calc(50%-var(--spacing)*1.25)] h-28 flex items-center justify-center overflow-hidden border border-gray-200 text-center text-xl hover:font-bold hover:text-orange-400 hover:border-orange-400"
              onClick={() => setCanvas(i.data)}
            >
              <span className="text-sm text-ellipsis">{i.desc}</span>
              <img src={i.img} alt={i.desc} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
