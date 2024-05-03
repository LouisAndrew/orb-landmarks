import type { JSXElement } from "solid-js";
import { createContext, createSignal, For, useContext } from "solid-js";

const STORAGE_KEY = "scale";
const defaultScale = parseFloat(localStorage.getItem(STORAGE_KEY) || "1");

function makeScaleContext() {
  const [scale, setScale] = createSignal(defaultScale);

  return [
    scale,
    {
      set: (value: number) => {
        localStorage.setItem("scale", value.toString());
        setScale(value);
      },
    },
  ] as const;
}

export const ScaleContext = createContext<ReturnType<typeof makeScaleContext>>([
  createSignal(defaultScale)[0],
  { set: () => {} },
]);

export function ScaleProvider(props: { children: JSXElement }) {
  const value = makeScaleContext();
  return (
    <ScaleContext.Provider value={value}>
      {props.children}
    </ScaleContext.Provider>
  );
}

export const useScale = () => useContext(ScaleContext);

const SCALES = [0.5, 0.75, 1, 1.25];
export default function () {
  const [scale, { set }] = useScale();

  return (
    <div class="scale">
      <For each={SCALES}>
        {(s) => (
          <button class={scale() === s ? "" : "ghost"} onClick={() => set(s)}>
            {s}
          </button>
        )}
      </For>
    </div>
  );
}
