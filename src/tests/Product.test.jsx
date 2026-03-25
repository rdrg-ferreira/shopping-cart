import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "../Product";

describe("Product component", () => {
  it("renders correctly", () => {
    const { container } = render(<Product />);
    expect(container).toMatchSnapshot();
  });

  it("calls onAddToCart with product and quantity when Add to cart is clicked", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    const product = { id: 1, title: "Keyboard", price: 49.99 };

    render(
      <Product
        product={product}
        onAddToCart={onAddToCart}
      />
    );

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith({
      product,
      quantity: 1,
    });
  });
});
