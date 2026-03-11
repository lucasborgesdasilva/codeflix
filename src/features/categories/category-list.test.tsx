import { renderWithProviders } from "../../utils/test-utils";
import { CategoryList } from "./category-list";

describe("CategoryList", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
