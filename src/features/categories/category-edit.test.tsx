import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/api-slice";
import { CategoryEdit } from "./category-edit";

const data = {
  id: "1",
  name: "Orchid",
  is_active: true,
  deleted_at: null,
  created_at: "2026-03-11T00:45:53+0000",
  updated_at: "2026-03-11T00:45:53+0000",
};

export const handlers = [
  rest.get(`${baseUrl}/categories/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.json({ data }));
  }),

  rest.put(`${baseUrl}/categories/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200));
  }),
];

const server = setupServer(...handlers);

describe("EditCategory", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryEdit />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CategoryEdit />);

    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");

    const submit = screen.getByText("Save");

    await waitFor(() => {
      expect(name).toHaveValue("Orchid");
    });

    fireEvent.change(name, { target: { value: "Orchid edited" } });
    fireEvent.change(description, { target: { value: "Description edited" } });
    fireEvent.click(isActive);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Category updated successfully!");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    server.use(
      rest.put(`${baseUrl}/categories/1`, (_, res, ctx) => {
        return res(ctx.status(400));
      }),
    );

    renderWithProviders(<CategoryEdit />);

    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");

    const submit = screen.getByText("Save");

    await waitFor(() => {
      expect(name).toHaveValue("Orchid");
    });

    fireEvent.change(name, { target: { value: "Orchid edited" } });
    fireEvent.change(description, { target: { value: "Description edited" } });
    fireEvent.click(isActive);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Some went wrong!");
      expect(text).toBeInTheDocument();
    });
  });
});
