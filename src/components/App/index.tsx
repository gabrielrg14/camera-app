import { useState, useRef } from "react";
import { Text } from "react-native";
import { Camera, CameraType, AutoFocus, FlashMode } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

import FunctionButton from "../FunctionButton";
import PhotoModal from "../PhotoModal";

import * as S from "./styles";

const App = () => {
  const cameraRef = useRef<Camera>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [cameraPermission, requestPermission] = Camera.useCameraPermissions();
  const [zoomValue, setZoomValue] = useState(0);
  const [flashMode, setFlashMode] = useState<"off" | "on" | "torch">("off");
  const [photoCaptured, setPhotoCaptured] = useState<string | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  if (!cameraPermission) requestPermission();
  if (!cameraPermission?.granted) {
    return (
      <S.Wrapper>
        <Text>Please grant camera usage permission to use the app</Text>
      </S.Wrapper>
    );
  }

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setPhotoCaptured(data.uri);
      setShowPhotoModal(true);
    }
  };

  const handleCameraZoom = (operation: "decrease" | "increase") => {
    if (operation === "decrease") setZoomValue(zoomValue - 0.25);
    if (operation === "increase") setZoomValue(zoomValue + 0.25);
  };

  const toggleFlashMode = () =>
    setFlashMode(
      flashMode === "off" ? "on" : flashMode === "on" ? "torch" : "off"
    );

  const toggleCameraType = () => {
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <S.Wrapper>
      {!cameraPermission?.granted ? (
        <Text>Please grant camera usage permission to use the app</Text>
      ) : (
        <>
          <S.ButtonsView>
            <FunctionButton
              size={48}
              background="#161817"
              disabled={zoomValue <= 0}
              onPress={() => handleCameraZoom("decrease")}
            >
              <Ionicons
                name="remove"
                size={32}
                color={zoomValue <= 0 ? "#71797E" : "#FFF"}
              />
            </FunctionButton>
            <FunctionButton
              size={48}
              background="#161817"
              onPress={() => toggleFlashMode()}
            >
              <Ionicons
                name={flashMode === "off" ? "flash-off" : "flash"}
                size={32}
                color={flashMode === "torch" ? "#FFEA00" : "#FFF"}
              />
            </FunctionButton>
            <FunctionButton
              size={48}
              background="#161817"
              disabled={zoomValue >= 1}
              onPress={() => handleCameraZoom("increase")}
            >
              <Ionicons
                name="add"
                size={32}
                color={zoomValue >= 1 ? "#71797E" : "#FFF"}
              />
            </FunctionButton>
          </S.ButtonsView>
          <S.ExpoCamera
            type={cameraType}
            ref={cameraRef}
            autoFocus={AutoFocus.auto}
            zoom={zoomValue}
            flashMode={FlashMode[flashMode]}
          />
          <S.ButtonsView>
            <FunctionButton
              size={48}
              background="#161817"
              disabled={!photoCaptured}
              onPress={() => setShowPhotoModal(true)}
            >
              {photoCaptured ? (
                <S.RoundedPhoto source={{ uri: photoCaptured }} />
              ) : (
                <Ionicons name="images" size={32} color="#FFF" />
              )}
            </FunctionButton>

            <FunctionButton
              size={72}
              background="#18a330"
              onPress={handleTakePicture}
            >
              <Ionicons name="camera" size={48} color="#FFF" />
            </FunctionButton>

            <FunctionButton
              size={48}
              background="#161817"
              onPress={toggleCameraType}
            >
              <Ionicons name="camera-reverse" size={32} color="#FFF" />
            </FunctionButton>
          </S.ButtonsView>
        </>
      )}

      {photoCaptured && (
        <PhotoModal
          show={showPhotoModal}
          close={() => setShowPhotoModal(false)}
          photoUri={photoCaptured}
        />
      )}
    </S.Wrapper>
  );
};

export default App;
