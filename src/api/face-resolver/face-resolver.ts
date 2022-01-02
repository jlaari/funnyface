import { DetectedFace } from "@azure/cognitiveservices-face/esm/models";
import NICKNAMES from "./nicknames-fi.json";
import get from "lodash/get";
import axios from "axios";
import { FaceModels } from "@azure/cognitiveservices-face";
import { getInsults, Insult, Operator, InsultValue } from "./insults-parser";

export type FaceAttributes = {
  message: string;
  age: number;
  nickname: string;
  detectedAttribute: string;
  detectedConfidence: number;
  detectedValue: string;
};

export type FaceResolveError = {
  message: string;
};

type AttributeValue = number | string;

const COGNITIVE_SERVICE_URL = process.env.AZURE_COGNITIVE_SERVICE_URL;

const COGNITIVE_SERVICE_SUBSCRIPTION_KEY =
  process.env.AZURE_COGNITIVE_SERVICE_SUBSCRIPTION_KEY;

if (!COGNITIVE_SERVICE_SUBSCRIPTION_KEY) {
  throw new Error("AZURE_COGNITIVE_SERVICE_SUBSCRIPTION_KEY is required");
}

if (!COGNITIVE_SERVICE_URL) {
  throw new Error("AZURE_COGNITIVE_SERVICE_URL is required");
}

const INSULTS = getInsults();

const NO_FACE_ERROR_MESSAGES = [
  "Taidat olla niin ruma, etten löytänyt kuvasta edes naamaa.",
  "Koitappa kääntää se kamera itseäsi kohden, että löydän naaman, urpo.",
  "Ei tästä kuvasta naamaa löydy. Kokeile uusiksi, valopää",
];

const MULTIPLE_FACES_ERROR_MESSAGE = [
  "Tarkoituksena on ottaa kuva itsestään, eikä koko perkeleen apinalaumasta.",
  "Älä rahtaa kuvaan koko perhettäsi, tollo. Ainoastaan oma naamasi.",
];

const OPERATOR_COMPARERS = {
  [Operator[">"]]: (a: AttributeValue, b: InsultValue) => {
    return a > b;
  },
  [Operator["<"]]: (a: AttributeValue, b: InsultValue) => {
    return a < b;
  },
  [Operator["=="]]: (a: AttributeValue, b: InsultValue) => {
    return a.toString().toLowerCase() === b.toString().toLowerCase();
  },
};

export const resolveFace = async (
  image: Buffer
): Promise<FaceAttributes | FaceResolveError> => {
  const faces = await callCognitiveApi(image);
  if (faces.length > 1) {
    return {
      message: getRandom<string>(MULTIPLE_FACES_ERROR_MESSAGE),
    };
  }
  const face = faces[0];
  if (!face) {
    return {
      message: getRandom<string>(NO_FACE_ERROR_MESSAGES),
    };
  }

  const matchingInsults = INSULTS.filter(matchFace(face));
  const insult = getRandom<Insult>(matchingInsults);

  return {
    message: insult.message,
    age: face.faceAttributes?.age,
    nickname: getRandom<string>(NICKNAMES),
    detectedAttribute: insult.attribute,
    detectedConfidence: get(face.faceAttributes, insult.attribute),
    detectedValue: get(face.faceAttributes, insult.attribute),
  };
};

const callCognitiveApi = async (
  image: Buffer
): Promise<FaceModels.FaceDetectWithStreamResponse> => {
  const request = {
    headers: {
      "content-type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": COGNITIVE_SERVICE_SUBSCRIPTION_KEY,
    },
    params: {
      returnFaceId: "false",
      faceIdTimeToLive: 60,
      returnFaceLandmarks: "false",
      recognitionModel: "recognition_04",
      returnFaceAttributes:
        "age,gender,headPose,smile,facialHair,glasses,emotion," +
        "hair,makeup,occlusion,accessories,blur,exposure,noise",
    },
  };
  try {
    const response = await axios.post<FaceModels.FaceDetectWithStreamResponse>(
      COGNITIVE_SERVICE_URL,
      image,
      request
    );
    return response.data;
  } catch (error) {
    let message = `Request to Azure cognitive service failed. ${error}.`;
    if (axios.isAxiosError(error)) {
      message += ` Response body: ${JSON.stringify(error?.response?.data)}`;
    }
    throw new Error(message);
  }
};

const getRandom = <T>(array: any[]): T => {
  return array[getRandomInt(0, array.length)];
};

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const matchFace = (face: DetectedFace) => {
  return (insult: Insult) => {
    const detected: AttributeValue = get(face.faceAttributes, insult.attribute);
    const compare = OPERATOR_COMPARERS[insult.operator];
    return compare(detected, insult.value);
  };
};
