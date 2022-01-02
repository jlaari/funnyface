import React, { MutableRefObject, useContext } from "react";
import Webcam from "react-webcam";
import { WindowContext } from "../common/WindowContextProvider";
import { font } from "../styles/theme";

export interface WebcamImage {
  api: MutableRefObject<WebcamImageApi>;
  afterCapture: (image: string) => void;
}

export interface WebcamImageApi {
  ready: () => void;
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
    ready: ready,
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

  function ready() {
    setReadyToShoot(true);
  }

  const [readyToShoot, setReadyToShoot] = React.useState<boolean>();
  const [image, setImage] = React.useState<string | null>(null);

  if (image) {
    // TODO: Change to Image component later. Also update .eslintrc.json then.
    return (
      <div className="webcam-image">
        <img src={image} alt="Kuva sinusta" height={height} />
      </div>
    );
  }

  if (!readyToShoot) {
    return (
      <div className="webcam-instructions">
        <p>
          Hei valopää. Tarvitsen luvan kameraasi, jotta saan tehtyä sinulle
          räätälöidyn vittuilun.
        </p>
        <p>Emme tallenna kuvaasi.</p>
        <p>Käyttö omalla vastuulla.</p>
        <style jsx>{`
          .webcam-instructions {
            text-align: center;
            height: ${height}px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0 35px;
          }
        `}</style>
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
