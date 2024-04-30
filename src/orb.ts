import OBRSDK from "@owlbear-rodeo/sdk";

export type ORB = typeof OBRSDK;
export default OBRSDK;

export const ID = "com.louis-andrew.orb-landmarks";
export const METADATA_PROPERTY = `${ID}/metadata`;

export const GRID_SIZE = 75;
