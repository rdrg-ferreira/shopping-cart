import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routes from "../routes";
import { createMemoryRouter, RouterProvider } from "react-router";

const mockedProducts = [
  {
    id: 1,
    title: "Keyboard",
    price: 49.99,
    image: "keyboard.png",
    description: "Mechanical keyboard",
  },
];

beforeEach(() => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    status: 200,
    json: async () => mockedProducts,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Shop component", () => {
  it("renders correctly", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"],
    });

    const { container } = render(<RouterProvider router={router} />);

    await screen.findByRole("link", { name: /keyboard/i });

    expect(container).toMatchSnapshot();
  });

  it("renders specific product page after user clicks on one", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"],
    });

    render(<RouterProvider router={router} />);

    const productLink = await screen.findByRole("link", { name: /keyboard/i });

    await user.click(productLink);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/product/1");
    });
  });
});
