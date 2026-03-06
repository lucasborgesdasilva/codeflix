import { renderWithProviders } from "../../utils/test-utils";
import { CastMembersCreate } from "./cast-members-create";

describe("CreateCastMember", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CastMembersCreate />);
    expect(asFragment()).toMatchSnapshot();
  });
});
