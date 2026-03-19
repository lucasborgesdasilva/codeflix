import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { baseUrl } from "../api/api-slice";
import { CategoryList } from "./category-list";
import { categoryResponse } from "./mocks";

export const handlers = [
  //Find all
  rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
    return res(ctx.json(categoryResponse), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

describe("CategoryList", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryList />);
    expect(asFragment()).toMatchSnapshot();
  });

  // it("should render loading state", async () => {
  //   renderWithProviders(<CategoryList />);

  //   const loading = await screen.findByRole("progressbar");
  //   expect(loading).toBeInTheDocument();
  // });

  it("should render success state", async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("Orchid");

      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const error = screen.getByText("Error fetching categories");
      expect(error).toBeInTheDocument();
    });
  });
});
