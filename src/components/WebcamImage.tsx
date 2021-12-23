import React, { MutableRefObject, useContext } from "react";
import Webcam from "react-webcam";
import { WindowContext } from "../common/WindowContextProvider";

export interface WebcamImage {
  api: MutableRefObject<WebcamImageApi>;
  afterCapture: (image: string) => void;
}

export interface WebcamImageApi {
  reset: () => void;
  trigger: () => void;
}

const videoConstraints: MediaStreamConstraints["video"] = {
  facingMode: "user",
};

const WebcamImage: React.FunctionComponent<WebcamImage> = ({
  api,
  afterCapture,
}) => {
  const { breakpoint } = useContext(WindowContext);
  const webcamRef = React.useRef() as MutableRefObject<Webcam>;
  api.current = {
    trigger: capture,
    reset: reset,
  };
  const height = breakpoint == "small" ? 250 : 400;
  videoConstraints.height = height;

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
    return (
      <div className="webcam-image">
        <img src={image} alt="Kuva sinusta" />
      </div>
    );
  }

  return (
    <div className="webcam">
      <Webcam
        audio={false}
        mirrored
        height={height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <style jsx global>{`
        video {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default WebcamImage;
