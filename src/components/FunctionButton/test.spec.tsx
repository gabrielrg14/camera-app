import { render, fireEvent } from "@testing-library/react-native"

import FunctionButton from "."
import { Text } from "react-native";

describe("<FunctionButton />", () => {
  describe("the children prop was passed", () => {
    it("should render the button and the passed text", () => {
      const { getByRole, getByText } = render(
        <FunctionButton>
          <Text>Test</Text>
        </FunctionButton>
      )

      expect(getByRole(/button/i)).toBeOnTheScreen()
      expect(getByText(/test/i)).toBeOnTheScreen()
    })
  })

  describe("the disabled prop is true", () => {
    it("should render the button disabled", () => {
      const { getByRole } = render(<FunctionButton disabled={true} />)

      expect(getByRole(/button/i)).toBeDisabled()
    })
  })

  describe("the disabled prop is false", () => {
    it("should render the button enabled", () => {
      const { getByRole } = render(<FunctionButton disabled={false} />)

      expect(getByRole(/button/i)).toBeEnabled()
    })
  })

  describe("style props were passed", () => {
    it("should render passed styles correctly", () => {
      const { getByRole } = render(
        <FunctionButton
          size={48}
          background="#161817"
        />
      )

      expect(getByRole(/button/i)).toHaveStyle({ height: 48, width: 48, backgroundColor: "#161817" })
    })
  })

  describe("onPress prop was passed", () => {
    it("should call the onPress when the button is pressed", () => {
      const onPressMock = jest.fn()

      const { getByRole } = render(<FunctionButton onPress={onPressMock} />)

      fireEvent.press(getByRole(/button/i))

      expect(onPressMock).toHaveBeenCalled()
    })
  })
})
