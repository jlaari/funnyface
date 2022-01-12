import { FaceResponse } from "../api/face";

const internalApiBase = "api/";

export const postFace = async (base64Image: string): Promise<FaceResponse> => {
  const body = await base64ToBlob(base64Image);
  const response = await fetch(`${internalApiBase}/face`, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body,
  });
  if (!response.ok) {
    throw new Error(`Request failed with the HTTP status ${response.status}.`);
  }
  return response.json() as Promise<FaceResponse>;
};

const base64ToBlob = async (base64: string): Promise<Blob> => {
  return await (await fetch(base64)).blob();
};
