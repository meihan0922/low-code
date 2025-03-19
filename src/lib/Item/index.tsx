import { JSX } from "react";
import classNames from "classnames";

function Item({
  label,
  children,
  className,
}: {
  label: string;
  className?: string;
  children: JSX.Element;
}) {
  return (
    <div
      className={classNames(
        "flex gap-2 justify-start items-center mx-2 my-1 p-1",
        {
          [className]: !!className,
        }
      )}
    >
      <label className="text-[#666] text-start">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Item;
