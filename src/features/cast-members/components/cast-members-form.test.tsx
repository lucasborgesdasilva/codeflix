import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CastMemberForm } from "./cast-members-form";

const Props = {
  castMember: {
    id: "1",
    name: "test",
    type: 1,
    deletedAt: null,
    createdAt: "2026-02-25T00:00:00.000000Z",
    updatedAt: "2026-02-25T00:00:00.000000Z",
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
}

describe("CastMemberForm", () => {
  it("should render castMember form correctly", () => {
    const { asFragment } = render(<CastMemberForm {...Props} />, {
      wrapper: BrowserRouter
    });

    expect(asFragment()).toMatchSnapshot();
  })

  it("should render castMember form with loading state", () => {
    const { asFragment } = render(<CastMemberForm {...Props} isLoading />, {
      wrapper: BrowserRouter
    });

    expect(asFragment()).toMatchSnapshot();
  })

  it("should render castMember form with disabled state", () => {
    const { asFragment } = render(<CastMemberForm {...Props} isLoading isDisabled/>, {
      wrapper: BrowserRouter
    });

    expect(asFragment()).toMatchSnapshot();
  })
})