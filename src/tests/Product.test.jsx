import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "../components/Product";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";

function renderProductWithRouter({ product, onAddToCart = vi.fn() }) {
  const routes = [
    {
      path: "/",
      element: (
        <Outlet
          context={{
            products: [product],
            productsLoading: false,
            productsError: null,
            onAddToCart,
          }}
        />
      ),
      children: [{ path: "product/:id", element: <Product /> }],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [`/product/${product.id}`],
  });

  render(<RouterProvider router={router} />);

  return { onAddToCart };
}

describe("Product component", () => {
  it("renders correctly", () => {
    const product = {
      id: 1,
      title: "Keyboard",
      price: 49.99,
      image: "keyboard.png",
      description: "Mechanical keyboard",
    };

    const { container } = renderProductWithRouter({ product });
    expect(container).toMatchSnapshot();
  });

  it("calls onAddToCart with product and quantity when Add to cart is clicked", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    const product = {
      id: 1,
      title: "Keyboard",
      price: 49.99,
      image: "keyboard.png",
      description: "Mechanical keyboard",
    };

    renderProductWithRouter({ product, onAddToCart });

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(
      { id: product.id, title: product.title, price: product.price },
      1
    );
  });
});
