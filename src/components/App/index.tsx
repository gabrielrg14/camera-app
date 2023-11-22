import { useState, useRef } from "react";
import { Text } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

import FunctionButton from "../FunctionButton";
import PhotoModal from "../PhotoModal";

import * as S from "./styles";

const App = () => {
  const cameraRef = useRef<Camera>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [cameraPermission, requestPermission] = Camera.useCameraPermissions();
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
          <S.ExpoCamera type={cameraType} ref={cameraRef} />
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
