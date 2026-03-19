import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/api-slice";
import { CategoryList } from "./category-list";
import { categoryResponse, categoryResponse2 } from "./mocks";

export const handlers = [
  //Find all
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(categoryResponse2), ctx.delay(150));
    }
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

  it("should handle On PageChange", async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("Orchid");
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText("BlanchedAlmond");
      expect(name).toBeInTheDocument();
    });
  });

  it("should handle FilterChange", async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("Orchid");
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search…"); //Pega o Input que tem o placeholder Search...

    // FireEvent on Change
    fireEvent.change(input, {
      target: { value: "Cyan" },
    });

    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });
  });
});
