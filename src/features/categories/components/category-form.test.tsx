import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CategoryForm } from "./category-form";

const Props = {
  category: {
    id: "1",
    name: "Teste",
    description: "descrição de teste",
    is_active: true,
    deleted_at: "",
    created_at: "",
    updated_at: "",
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: () => {},
  handleChange: () => {},
  handleToggle: () => {},
}
describe("CategoryForm", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<CategoryForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CategoryForm wit loading", () => {
    const { asFragment } = render(
      <CategoryForm {...Props} 
        isLoading={true} 
        isDisabled={true} 
      />, {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
})