import React, { MutableRefObject } from "react";
import Webcam from "react-webcam";

export interface WebcamImage {
  api: MutableRefObject<WebcamImageApi>;
  afterCapture: (image: string) => void;
}

export interface WebcamImageApi {
  reset: () => void;
  trigger: () => void;
}

const videoConstraints = {
  facingMode: "user",
};

const WebcamImage: React.FunctionComponent<WebcamImage> = ({
  api,
  afterCapture,
}) => {
  const webcamRef = React.useRef() as MutableRefObject<Webcam>;
  api.current = {
    trigger: capture,
    reset: reset,
  };

  function capture() {
    const image: string = webcamRef.current.getScreenshot() || "";
    setImage(image);
    afterCapture(image);
  }

  function reset() {
    setImage(null);
  }

  const [image, setImage] = React.useState<string | null>(null);

  if (image) {
    // TODO: Change to Image component later. Also update .eslintrc.json then.
    return <img src={image} alt="Kuva sinusta" />;
  }

  return (
    <div className="webcam">
      <Webcam
        audio={false}
        mirrored
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <style jsx global>{`
        video {
          width: 100%;
          max-width: 500px;
        }
      `}</style>
    </div>
  );
};

export default WebcamImage;
