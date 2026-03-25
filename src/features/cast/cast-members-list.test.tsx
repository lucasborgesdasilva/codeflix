import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/api-slice";
import { CastMembersList } from "./cast-members-list";
import { castMemberResponse, castMemberResponse2 } from "./mocks";

export const handlers = [
  rest.get(`${baseUrl}/cast_members`, (req, res, ctx) => {
    //check if is page 2
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.delay(150), ctx.json(castMemberResponse2));
    }
    return res(ctx.delay(150), ctx.status(200), ctx.json(castMemberResponse));
  }),
  rest.delete(
    `${baseUrl}/cast_members/948d4dfb-8f5c-4d7b-9b59-b6e3ed499ee1`,
    (_, res, ctx) => {
      return res(ctx.status(204), ctx.delay(150));
    },
  ),
];

const server = setupServer(...handlers);

describe("ListCastMember", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CastMembersList />);
    expect(asFragment()).toMatchSnapshot();
  });

  // it("should render loading state", () => {
  //   renderWithProviders(<CastMembersList />);
  //   const loading = screen.getByRole("progressbar");
  //   expect(loading).toBeInTheDocument();
  // });

  it("should render success state", async () => {
    renderWithProviders(<CastMembersList />);

    await waitFor(() => {
      const table = screen.getByText("Gutkowski");
      expect(table).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/cast_members`, (_, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    renderWithProviders(<CastMembersList />);

    await waitFor(() => {
      const error = screen.getByText("Error fetching cast members");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle on PageChange", async () => {
    renderWithProviders(<CastMembersList />);

    await waitFor(() => {
      const table = screen.getByText("Gutkowski");
      expect(table).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const table = screen.getByText("Cummerata");
      expect(table).toBeInTheDocument();
    });
  });

  it("should handle FilterChange", async () => {
    renderWithProviders(<CastMembersList />);

    await waitFor(() => {
      const table = screen.getByText("Gutkowski");
      expect(table).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Search…");
    fireEvent.change(input, { target: { value: "Gutkowski" } });

    await waitFor(() => {
      const loading = screen.getByRole("progressbar");
      expect(loading).toBeInTheDocument();
    });
  });

  it("should handle delete category success", async () => {
    renderWithProviders(<CastMembersList />);

    await waitFor(() => {
      const name = screen.getByText("Gutkowski");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const text = screen.getByText("Cast member deleted!");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle delete category error", async () => {
    server.use(
      rest.delete(
        `${baseUrl}/cast_members/948d4dfb-8f5c-4d7b-9b59-b6e3ed499ee1`,
        (_, res, ctx) => {
          return res(ctx.status(500));
        },
      ),
    );

    renderWithProviders(<CastMembersList />);

    await waitFor(() => {
      const name = screen.getByText("Gutkowski");
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const text = screen.getByText("Cast member not deleted");
      expect(text).toBeInTheDocument();
    });
  });
});
