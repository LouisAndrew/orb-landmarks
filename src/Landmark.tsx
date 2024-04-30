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
    await sdk.player.setSyncView(true);

    const width = await sdk.viewport.getWidth();
    const height = await sdk.viewport.getHeight();

    await sdk.viewport.animateTo({
      scale: window.scale,
      position: {
        x: landmark.position.x * -1 + GRID_SIZE + width / 2,
        y: landmark.position.y * -1 + GRID_SIZE + height / 2,
      },
    });

    const fogs = await sdk.scene.items.getItems(
      (item) => item.layer === "FOG" && item.attachedTo === landmark.id,
    );

    await Promise.all(
      fogs.map(async (f) =>
        sdk.scene.items.updateItems([f], ([fog]) => {
          fog.visible = false;
        }),
      ),
    );

    await sdk.player.setSyncView(false);
  }

  function landmarkName() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (item as any)?.text?.plainText || metadata.name;
  }

  // async function removeLandmark(landmark: Item) {
  //   sdk.scene.items.updateItems([landmark], ([item]) => {
  //     if (item) {
  //       delete item.metadata[METADATA_PROPERTY];
  //     }
  //   });
  // }

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
        <span>{landmarkName()}</span>
      </span>

      <div class="buttons">
        <button onClick={() => centerLandmark(item)}>C</button>
        {/* <button onClick={() => removeLandmark(item)}>-</button> */}
        <button onClick={() => renameLandmark(item)}>N</button>
      </div>
    </div>
  );
}
