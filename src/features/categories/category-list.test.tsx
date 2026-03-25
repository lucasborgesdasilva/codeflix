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

  //delete
  //Adicionamos o id do category que queremos deletar, para que o msw saiba qual endpoint ele deve interceptar, e retornar a resposta correta.
  rest.delete(`${baseUrl}/categories/:id`, (req, res, ctx) => {
    const { id } = req.params;

    if (id === "0711af0c-7d83-442f-a1b2-54e2eb3c8295") {
      return res(ctx.status(204), ctx.delay(150));
    }

    return res(ctx.status(500), ctx.delay(150));
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

  it("should handle Delete Category success", async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("Orchid");
      expect(name).toBeInTheDocument();
    });

    //Como não temos algo que identifica nosso botão de delete, vamos atribuir a ele, um data-testId.
    const button = screen.getAllByTestId("delete-button")[0]; //Pega o primeiro botão de delete, como tem mais de um, usamos o index 0.
    fireEvent.click(button);

    await waitFor(() => {
      const error = screen.getByText("Category deleted success!");
      expect(error).toBeInTheDocument();
    });
  });

  it("should handle Delete Category error", async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText("Orchid");
      expect(name).toBeInTheDocument();
    });

    //Como eu quero que de erro, eu pego o segundo botão de delete, que tem um id diferente do que o msw espera, e por isso ele vai retornar um erro.
    const button = screen.getAllByTestId("delete-button")[1];
    fireEvent.click(button);

    await waitFor(() => {
      const error = screen.getByText("Category not deleted");
      expect(error).toBeInTheDocument();
    });
  });
});
