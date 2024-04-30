import "./App.css";

import { createSignal, onMount, Show } from "solid-js";

import { setupContextMenu } from "./context-menu";
import LandmarkList from "./LandmarkList";
import sdk from "./orb";

function App() {
  const [isReady, setIsReady] = createSignal(false);
  onMount(() => {
    sdk.onReady(() => {
      setIsReady(true);
      setupContextMenu(sdk);
    });
  });

  return (
    <Show when={isReady()}>
      <div class="app">
        <LandmarkList />
      </div>
    </Show>
  );
}

export default App;
