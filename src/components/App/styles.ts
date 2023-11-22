import styled from 'styled-components/native'
import { Camera } from "expo-camera";

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ExpoCamera = styled(Camera)`
  width: 100%;
  height: 70%;
`;

export const ButtonsView = styled.View`
  flex: 1;
  position: absolute;
  bottom: 25px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const RoundedPhoto = styled.Image`
  height: 48px;
  width: 48px;
  border-radius: 50px;
`;
