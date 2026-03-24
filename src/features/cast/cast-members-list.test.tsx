import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { baseUrl } from "../api/api-slice";
import { CastMembersList } from "./cast-members-list";
import { castMemberResponse } from "./mocks";

export const handlers = [
  rest.get(`${baseUrl}/cast_members`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200), ctx.json(castMemberResponse));
  }),
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
});
