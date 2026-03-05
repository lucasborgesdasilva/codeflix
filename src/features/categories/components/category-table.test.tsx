import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CategoryTable } from "./category-table";

const Props = {
  data: undefined,
  perPage: 10,
  isFetching: false,
  rowsPerPage: [10, 20, 50, 100],
  handleOnPageChange: () => {},
  handleFilterChange: () => {},
  handleOnPageSizeChange: () => {},
  handleDelete: () => {},
};

const mockData = {
  data: [
    {
      id: "1",
      name: "Teste",
      description: "descrição de teste",
      is_active: true,
      deleted_at: "",
      created_at: "",
      updated_at: "",
    },
    {
      id: "2",
      name: "Teste2",
      description: "descrição de teste2",
      is_active: true,
      deleted_at: "",
      created_at: "",
      updated_at: "",
    },
  ],
  meta: {
    currentPage: 1,
    from: 1,
    lastPage: 1,
    path: "http://localhost:8000/api/cast_members",
    perPage: 15,
    to: 1,
    total: 1,
  },
  links: {
    first: "http://localhost:8000/api/cast_members?page=1",
    last: "http://localhost:8000/api/cast_members?page=1",
    prev: "",
    next: "",
  },
};

describe("CategoryTable", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<CategoryTable {...Props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CategoryTable with loading", () => {
    const { asFragment } = render(
      <CategoryTable {...Props} isFetching={true} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CategoryTable with data", () => {
    const { asFragment } = render(
      <CategoryTable {...Props} data={mockData} />,
      {
        wrapper: BrowserRouter,
      },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
