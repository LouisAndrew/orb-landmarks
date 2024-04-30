import type { ORB } from "./orb";
import { ID, METADATA_PROPERTY } from "./orb";
import type { LandmarkMetadata } from "./types";

function getLandmarkName() {
  return window.prompt("Landmark name");
}

export function setupContextMenu(sdk: ORB) {
  sdk.contextMenu.create({
    id: `${ID}/context-menu`,
    icons: [
      {
        icon: "/add.svg",
        label: "Add Landmark",
        filter: {
          every: [
            { key: "layer", value: "ATTACHMENT" },
            { key: ["metadata", METADATA_PROPERTY], value: undefined },
          ],
        },
      },
      {
        icon: "/remove.svg",
        label: "Remove Landmark",
        filter: {
          every: [{ key: "layer", value: "ATTACHMENT" }],
        },
      },
    ],
    onClick(context) {
      const landmarkName = getLandmarkName() || "";

      const addLandmark = context.items.every(
        (item) => item.metadata[`${ID}/metadata`] === undefined,
      );

      sdk.scene.items.updateItems(context.items, (items) => {
        items.forEach((item) => {
          const landmarkMetadata: LandmarkMetadata = {
            name: landmarkName,
          };

          if (addLandmark) {
            return (item.metadata[METADATA_PROPERTY] = landmarkMetadata);
          }

          delete item.metadata[METADATA_PROPERTY];
        });
      });
    },
  });
}
