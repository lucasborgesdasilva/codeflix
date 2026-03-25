import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/api-slice";
import { CategoryCreate } from "./category-create";

export const handlers = [
  //Create Category
  rest.post(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("CreateCategory", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryCreate />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle submit", async () => {
    renderWithProviders(<CategoryCreate />);

    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");
    const submit = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(name, { target: { value: "Test Category" } });
    fireEvent.change(description, { target: { value: "Test Description" } });
    fireEvent.click(isActive);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Category created successfully!");
      expect(text).toBeInTheDocument();
    });
  });

  it("should handle submit error", async () => {
    //Estou sobrescrevendo o handler para simular um erro
    server.use(
      rest.post(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      }),
    );

    renderWithProviders(<CategoryCreate />);

    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");
    const submit = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(name, { target: { value: "Test Category" } });
    fireEvent.change(description, { target: { value: "Test Description" } });
    fireEvent.click(isActive);

    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Some went wrong!");
      expect(text).toBeInTheDocument();
    });
  });
});
