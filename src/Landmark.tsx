import type { Item } from "@owlbear-rodeo/sdk";
import type { JSXElement } from "solid-js";

import sdk, { GRID_SIZE, METADATA_PROPERTY } from "./orb";
import type { LandmarkMetadata } from "./types";

export default function ({
  item,
  metadata,
  children,
}: {
  item: Item;
  metadata: LandmarkMetadata;
  children: JSXElement;
}) {
  async function centerLandmark(landmark: Item) {
    await sdk.viewport.reset();
    const width = await sdk.viewport.getWidth();
    const height = await sdk.viewport.getHeight();

    await sdk.viewport.animateTo({
      scale: 1,
      position: {
        x: landmark.position.x * -1 + GRID_SIZE + width / 2,
        y: landmark.position.y * -1 + GRID_SIZE + height / 2,
      },
    });
  }

  async function removeLandmark(landmark: Item) {
    sdk.scene.items.updateItems([landmark], ([item]) => {
      if (item) {
        delete item.metadata[METADATA_PROPERTY];
      }
    });
  }

  async function renameLandmark(landmark: Item) {
    sdk.scene.items.updateItems([landmark], ([item]) => {
      if (item) {
        item.metadata[METADATA_PROPERTY].name = window.prompt("Landmark name");
        item.text.plainText = item.metadata[METADATA_PROPERTY].name;
      }
    });
  }

  return (
    <div class="landmark">
      <span>
        {children}
        <span>{metadata.name}</span>
      </span>

      <div class="buttons">
        <button onClick={() => centerLandmark(item)}>C</button>
        <button onClick={() => removeLandmark(item)}>-</button>
        <button onClick={() => renameLandmark(item)}>N</button>
        <button onClick={() => console.log(item)}>L</button>
      </div>
    </div>
  );
}
