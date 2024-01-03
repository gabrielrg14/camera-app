import { render, fireEvent } from "@testing-library/react-native"

import PhotoModal from "."

describe("<PhotoModal />", () => {
  const closeMock = jest.fn()

  it("should render the three functionality buttons with their icons", async () => {
    const { findAllByRole, findAllByTestId } = render(<PhotoModal show={true} close={closeMock} photoUri={""} />)

    expect(await findAllByRole(/button/i)).toHaveLength(3)
    expect(await findAllByTestId(/buttonIcon/i)).toHaveLength(3)
  })

  it("should call the function when the close button is pressed", async () => {
    const { findByTestId } = render(<PhotoModal show={true} close={closeMock} photoUri={""} />)

    fireEvent.press(await findByTestId(/closeButton/i))

    expect(closeMock).toHaveBeenCalled()
  })

  describe("the show prop is true", () => {
    it("should render the modal visible", async () => {
      const { findByTestId } = render(<PhotoModal show={true} close={closeMock} photoUri={""} />)

      expect(await findByTestId(/photoModal/i)).toBeVisible()
    })
  });

  describe("the show prop is false", () => {
    it("should render the modal NOT visible", async () => {
      const { findByTestId } = render(<PhotoModal show={false} close={closeMock} photoUri={""} />)

      expect(await findByTestId(/photoModal/i)).not.toBeVisible()
    })
  });
});
