import type { NextPage } from "next";
import React, { MutableRefObject } from "react";
import { color, font } from "../styles/theme";
import ButtonText from "../components/ButtonText";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Spacing from "../components/Spacing";
import { FaceAttributes } from "../api/face-resolver/face-resolver";
import FixedMessage from "../components/FixedMessage";
import WebcamImage, { WebcamImageApi } from "../components/WebcamImage";
import { postFace } from "../utils/api";
import FixedNameOrErrorDisplay from "../components/FixedNameOrErrorDisplay";

const HomePage: NextPage = () => {
  const [faceAttributes, setFaceAttributes] =
    React.useState<FaceAttributes | null>();
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [faceAttributesLoading, setFaceAttributesLoading] =
    React.useState<boolean>(false);
  const webcamImageRef = React.useRef() as MutableRefObject<WebcamImageApi>;
  const afterCapture = async (image: string) => {
    setFaceAttributesLoading(true);
    try {
      const response = await postFace(image);
      if (!response.userError) {
        setFaceAttributes(response.attributes);
      }
      setErrorMessage(response.userError?.message);
    } catch (error) {
      setErrorMessage("Vituiskmän. Kokeile myöhemmin uudestaan.");
      console.error(error);
    }

    setFaceAttributesLoading(false);
  };
  const reset = React.useCallback(async () => {
    webcamImageRef.current.reset();
    setFaceAttributes(null);
  }, [webcamImageRef]);

  const buttonAction = faceAttributes
    ? () => reset()
    : () => webcamImageRef.current.trigger();

  const buttonText = faceAttributes ? "Nappaa uus" : "Nappaa foto";

  return (
    <div className="container">
      <main className="main">
        <Heading style="h1">Vittuilukamera</Heading>
        <FixedMessage
          title={faceAttributes?.message}
          attribute={faceAttributes?.detectedAttribute}
          confidence={faceAttributes?.detectedConfidence?.toString()}
        ></FixedMessage>
        <WebcamImage api={webcamImageRef} afterCapture={afterCapture} />
        <Spacing top={24} bottom={24}>
          <FixedNameOrErrorDisplay
            name={faceAttributes?.nickname}
            age={faceAttributes?.age?.toString()}
            errorMessage={errorMessage}
          />
        </Spacing>
        <Button onClick={buttonAction} disabled={faceAttributesLoading}>
          <ButtonText variant="primary">{buttonText}</ButtonText>
        </Button>
      </main>
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          height: 100vh;
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
