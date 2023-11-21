import styled from 'styled-components/native'

import FunctionButton from "../FunctionButton";

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 20px;
`;

export const CloseButton = styled(FunctionButton)`
  background-color: #FF0000;
`;

export const Photo = styled.Image`
  width: 100%;
  height: 70%;
  border-radius: 20px;
`;
