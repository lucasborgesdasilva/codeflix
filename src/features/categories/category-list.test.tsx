import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders, screen } from "../../utils/test-utils";
import { baseUrl } from "../api/api-slice";
import { categoryResponse } from "../cast/mocks";
import { CategoryList } from "./category-list";

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

  it("should render loading state", async () => {
    renderWithProviders(<CategoryList />);

    const loading = await screen.findByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });
});
