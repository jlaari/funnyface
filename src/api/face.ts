import type { NextApiRequest, NextApiResponse } from "next";
import {
  FaceAttributes,
  FaceResolveError,
  resolveFace,
} from "./face-resolver/face-resolver";

export type FaceResponse = {
  attributes?: FaceAttributes;
  userError?: FaceResolveError;
  error?: string;
};

export const FaceApiConfig = {
  api: {
    // Disable next-js body parser so that we can receive stream.
    bodyParser: false,
    // Disable error "API resolved without sending a response for /api/image, this may result in stalled requests."
    // This is a false warning because in the code we always return a response.
    // It's just Next.js doesn't know it.
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FaceResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  req.setEncoding("binary");

  let faceData = "";

  req.on("data", function (chunk) {
    faceData += chunk;
  });

  req.once("error", (error) => {
    return res.status(500).json({ error: `Failed to receive face: ${error}` });
  });

  req.on("end", async function () {
    try {
      const image = Buffer.from(faceData, "binary");
      const result = await resolveFace(image);
      // Result is FaceAttributes
      if ((result as FaceAttributes).age) {
        const attributes = result as FaceAttributes;
        return res.status(200).json({ attributes });
      }
      // Result is FaceDetectError.
      // Handle scenario when there was an error detecting face,
      // but we still want to show a message.
      return res.status(200).json({ userError: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: `Failed to process face` });
    }
  });
}
