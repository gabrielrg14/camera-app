import styled from 'styled-components/native'
import { Platform, StatusBar } from 'react-native';
import { Camera } from "expo-camera";

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Platform.OS === "android" ? `${StatusBar.currentHeight}px`: 0};
  align-items: center;
  justify-content: center;
`;

export const ExpoCamera = styled(Camera)`
  width: 100%;
  height: 70%;
`;

export const ButtonsView = styled.View`
  flex: 1;
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
