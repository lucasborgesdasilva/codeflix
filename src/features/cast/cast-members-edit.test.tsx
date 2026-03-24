import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/api-slice";
import { CastMembersEdit } from "./cast-members-edit";

const data = {
  id: "1",
  name: "test",
  type: "1",
};

export const handlers = [
  rest.get(`${baseUrl}/cast_members/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200), ctx.json({ data }));
  }),
  rest.put(`${baseUrl}/cast_members/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("EditCastMember", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CastMembersEdit />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CastMembersEdit />);

    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("test");
    });

    await waitFor(() => {
      const submit = screen.getByText("Save");
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText("Save");
    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Cast member updated successfully!");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.put(`${baseUrl}/cast_members/1`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      }),
    );

    renderWithProviders(<CastMembersEdit />);

    const name = screen.getByTestId("name");

    await waitFor(() => {
      expect(name).toHaveValue("test");
    });

    await waitFor(() => {
      const submit = screen.getByText("Save");
      expect(submit).toBeInTheDocument();
    });

    const submit = screen.getByText("Save");
    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Some went wrong!");
      expect(text).toBeInTheDocument();
    });
  });
});
