import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as S from "./styles";

type PhotoModalProps = {
  show: boolean;
  close: () => void;
  photoUri: string;
};

const PhotoModal = ({ show, close, photoUri }: PhotoModalProps) => {
  return (
    <Modal
      visible={show}
      onDismiss={close}
      animationType="slide"
      transparent={false}
    >
      <S.Content>
        <S.CloseButton onPress={close}>
          <Ionicons name="close" size={32} color="#FFF" />
        </S.CloseButton>
        <S.Photo source={{ uri: photoUri }} />
      </S.Content>
    </Modal>
  );
};

export default PhotoModal;
