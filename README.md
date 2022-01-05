# FunnyFace

This Next.js app includes the frontend for the [https://www.vittuilukamera.com](www.vittuilukamera.com) project.

The app asks the user to upload selfie and it will generate insult based on the uploaded picture.

## Technologies

Links to most important technologies:

- [npm](https://docs.npmjs.com/)
- [prettier](https://prettier.io/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React webcam](https://www.npmjs.com/package/react-webcam)
- [Face API - v1.0](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236)

## <a name="installation"></a> Getting started

1. Install node.js (anything above 8.11 should work).
2. Clone this repo
3. Run `yarn` in repository root.
4. Copy the `.env.example` file to `.env` and fill in the secrets
5. Run `yarn dev` to start a development server with hot reloading.

## Face API example response

```
[
  {
    "faceRectangle": { "top": 172, "left": 187, "width": 178, "height": 178 },
    "faceAttributes": {
      "smile": 0,
      "headPose": { "pitch": -6.6, "roll": -4.3, "yaw": 3.7 },
      "gender": "male",
      "age": 40,
      "facialHair": { "moustache": 0.6, "beard": 0.4, "sideburns": 0.1 },
      "glasses": "NoGlasses",
      "emotion": {
        "anger": 0.96,
        "contempt": 0,
        "disgust": 0.039,
        "fear": 0,
        "happiness": 0,
        "neutral": 0,
        "sadness": 0,
        "surprise": 0
      },
      "blur": { "blurLevel": "medium", "value": 0.74 },
      "exposure": { "exposureLevel": "goodExposure", "value": 0.45 },
      "noise": { "noiseLevel": "low", "value": 0.23 },
      "makeup": { "eyeMakeup": false, "lipMakeup": false },
      "accessories":[ { "type":"headwear", "confidence":1 } ],
      "occlusion": {
        "foreheadOccluded": false,
        "eyeOccluded": false,
        "mouthOccluded": false
      },
      "hair": {
        "bald": 0.28,
        "invisible": false,
        "hairColor": [
          { "color": "brown", "confidence": 0.92 },
          { "color": "blond", "confidence": 0.82 },
          { "color": "gray", "confidence": 0.79 },
          { "color": "black", "confidence": 0.37 },
          { "color": "other", "confidence": 0.11 },
          { "color": "red", "confidence": 0.07 },
          { "color": "white", "confidence": 0 }
        ]
      },
      "qualityForRecognition": "high"
    }
  }
]
```
