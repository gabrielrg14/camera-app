import { TouchableOpacityProps } from "react-native";

import { FunctionButtonStyles } from "../../@types/FunctionButtonStyles";

import * as S from "./styles";

type FunctionButtonProps = {
  children?: React.ReactNode;
};

const FunctionButton = ({
  children,
  ...rest
}: FunctionButtonProps & FunctionButtonStyles & TouchableOpacityProps) => {
  return <S.FunctionButton {...rest}>{children}</S.FunctionButton>;
};

export default FunctionButton;
