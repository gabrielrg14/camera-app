import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

type FunctionButtonProps = {
  children?: React.ReactNode;
};

const FunctionButton = ({
  children,
  ...rest
}: FunctionButtonProps & TouchableOpacityProps) => {
  return <S.FunctionButton {...rest}>{children}</S.FunctionButton>;
};

export default FunctionButton;
