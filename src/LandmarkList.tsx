/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Item } from "@owlbear-rodeo/sdk";
import { createSignal, For, onMount } from "solid-js";

import Landmark from "./Landmark";
import sdk from "./orb";
import { METADATA_PROPERTY } from "./orb";
import type { LandmarkMetadata } from "./types";

export default function () {
  const [items, setItems] = createSignal<Item[]>([]);

  onMount(() => {
    sdk.scene.items.onChange(setItems);
  });

  const landmarks = () =>
    items().filter((item) => !!item.metadata[METADATA_PROPERTY]);

  function getLandmarkMetadata(landmark: Item) {
    return landmark.metadata[METADATA_PROPERTY] as LandmarkMetadata;
  }

  async function refreshLandmarks() {
    const newItems = await sdk.scene.items.getItems();
    setItems(newItems);
  }

  async function hideAllFogs() {
    const fogs = await sdk.scene.items.getItems((item) => item.layer === "FOG");
    await Promise.all(
      fogs.map(async (f) =>
        sdk.scene.items.updateItems([f], ([fog]) => {
          fog.visible = true;
        }),
      ),
    );
  }

  return (
    <div class="landmark-list">
      <h3>Landmarks</h3>

      <For each={landmarks()}>
        {(landmark, index) => (
          <Landmark item={landmark} metadata={getLandmarkMetadata(landmark)}>
            <span>#{index() + 1}</span>
          </Landmark>
        )}
      </For>

      <button class="ghost" onClick={refreshLandmarks}>
        Refresh Landmarks
      </button>

      <button
        class="ghost"
        style={{ "margin-left": "12px" }}
        onClick={hideAllFogs}
      >
        Hide all fogs
      </button>
    </div>
  );
}
