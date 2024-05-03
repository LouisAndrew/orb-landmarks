import "./App.css";

import { createSignal, onMount, Show } from "solid-js";

import { setupContextMenu } from "./context-menu";
import LandmarkList from "./LandmarkList";
import sdk from "./orb";
import Scale, { ScaleProvider } from "./Scale";

function App() {
  const [isReady, setIsReady] = createSignal(false);
  window.scale = parseFloat(localStorage.getItem("scale") || "1");
  onMount(() => {
    sdk.onReady(() => {
      setIsReady(true);
      setupContextMenu(sdk);
    });
  });

  return (
    <Show when={isReady()}>
      <ScaleProvider>
        <div class="app">
          <Scale />
          <LandmarkList />
        </div>
      </ScaleProvider>
    </Show>
  );
}

export default App;
