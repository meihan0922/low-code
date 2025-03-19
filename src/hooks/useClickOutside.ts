import { useEffect } from "react";

/**
 * mousedown / touchstart 事件按下時立即觸發，不會管 mouseup 的點
 * click 會在 滑鼠按下（mousedown）+ 放開（mouseup）後
 *
 * 如果在 ref 內部觸發
 */

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    // 紀錄是否在 ref 內部發生事件，如果是的話
    let startedInside = false;
    // 確保點擊事件發生時，ref 仍然有效（已掛載）
    let startedWhenMounted = false;

    /** mousedown 可能發生在 ref 內部，
     * 因此 validateEventStart 先記錄點擊開始時的位置，
     * click 事件則用來判斷點擊結束後的位置，以避免誤判。 */

    const listener = (event) => {
      // 如果已經卸載或是未掛載，就不用再處理
      if (startedInside || !startedWhenMounted) return;
      if (!ref.current || ref.current.contains(event.target)) return;

      handler(event);
    };

    const validateEventStart = (e) => {
      // 事件觸發，把 ref 記錄下來
      startedWhenMounted = ref.current;
      // 如果是在 ref 內部發生點擊啟動，click 就可以略過
      startedInside = ref.current && ref.current.contains(event.target);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
