import styled from 'styled-components/native'

import { FunctionButtonStyles } from '../../@types/FunctionButtonStyles';

export const FunctionButton = styled.TouchableOpacity<FunctionButtonStyles>`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  height: ${props => props.size ? `${props.size}px` : "24px"};
  width: ${props => props.size ? `${props.size}px` : "24px"};
  background-color: ${props => props.background || "#FFF"};
`;
