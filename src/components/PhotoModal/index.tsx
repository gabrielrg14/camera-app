import { Modal, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { Ionicons } from "@expo/vector-icons";

import FunctionButton from "../FunctionButton";

import * as S from "./styles";

type PhotoModalProps = {
  show: boolean;
  close: () => void;
  photoUri: string;
};

const PhotoModal = ({ show, close, photoUri }: PhotoModalProps) => {
  const [mediaLibraryPermission, requestPermission] =
    MediaLibrary.usePermissions();

  const handleSharePhoto = async () => {
    await Sharing.shareAsync(photoUri).catch(() => {
      Alert.alert(
        "Unable to share photo",
        "An error occurred while sharing the photo."
      );
    });
  };

  const handleSavePhoto = async () => {
    if (!mediaLibraryPermission) requestPermission();
    if (!mediaLibraryPermission?.granted) {
      Alert.alert(
        "Permission required",
        "Please grant permission to use the media library to save the photo."
      );
      return;
    }

    await MediaLibrary.saveToLibraryAsync(photoUri)
      .then(() => {
        Alert.alert("Success!", "The photo has been saved in the library.");
      })
      .catch(() => {
        Alert.alert(
          "Unable to save photo to library",
          "An error occurred while saving the photo to the library."
        );
      });
  };

  return (
    <Modal
      visible={show}
      onDismiss={close}
      animationType="slide"
      transparent={false}
    >
      <S.Content>
        <S.ButtonsView>
          <FunctionButton size={48} background="#FF0000" onPress={close}>
            <Ionicons name="close" size={32} color="#FFF" />
          </FunctionButton>

          <FunctionButton
            size={48}
            background="#1877f2"
            onPress={handleSharePhoto}
          >
            <Ionicons name="share-social" size={32} color="#FFF" />
          </FunctionButton>

          <FunctionButton
            size={48}
            background="#161817"
            onPress={handleSavePhoto}
          >
            <Ionicons name="cloud-download" size={32} color="#FFF" />
          </FunctionButton>
        </S.ButtonsView>
        <S.Photo source={{ uri: photoUri }} />
      </S.Content>
    </Modal>
  );
};

export default PhotoModal;
