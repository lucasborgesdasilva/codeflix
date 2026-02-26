import { GridFilterModel } from "@mui/x-data-grid";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CastMembersTable } from "./cast-members-table";

const Props = {
    data: undefined,
    perPage: 20,
    isFetching: false,
    rowsPerPage: [10, 20, 30],
    handleOnPageChange: (page: number) => {},
    handleFilterChange: (filterModel: GridFilterModel) => {},
    handleOnPageSizeChange: (perPage: number) => {},
    handleDelete: (id: string) => {},
}

describe("CastMembersTable", () => {
  it("should render castMember table correctly", () => {
    const { asFragment } = render(<CastMembersTable {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember table with loading", () => {
    const { asFragment } = render(<CastMembersTable {...Props} isFetching />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember table with data", () => {
    const { asFragment } = render(
      <CastMembersTable 
        {...Props} 
        data={{
          data: [
            {
              id: "1",
              name: "teste",
              type: 1,
              deletedAt: null,
              createdAt: "2026-02-25T00:00:00.000000Z",
              updatedAt: "2026-02-25T00:00:00.000000Z",
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
          }
        }} 
      />, {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember table with empty data", () => {
    const { asFragment } = render(
      <CastMembersTable 
        {...Props} 
        data={{ data: [], meta: {} } as any} />, {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});