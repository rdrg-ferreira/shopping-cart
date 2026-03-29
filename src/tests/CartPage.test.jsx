import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes";

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

describe("CartPage component", () => {
    async function goToCartAfterAddingOneProduct(user) {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/product/1"],
        });

        const { container } = render(<RouterProvider router={router} />);

        await screen.findByRole("button", { name: /add to cart/i });
        await user.click(screen.getByRole("button", { name: /add to cart/i }));

        const cartLink = screen
            .getAllByRole("link")
            .find((link) => link.getAttribute("href") === "/cart");

        expect(cartLink).toBeDefined();
        await user.click(cartLink);

        await waitFor(() => {
            expect(router.state.location.pathname).toBe("/cart");
        });

        return container
    }

    it("renders correctly", async () => {
        const user = userEvent.setup();
        const container = await goToCartAfterAddingOneProduct(user);

        expect(container).toMatchSnapshot();
        expect(screen.getByText("Keyboard")).toBeInTheDocument();
        expect(screen.getByText("49.99")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /checkout/i })).toBeInTheDocument();
    });

    it("changing product count updates displayed list and removes item at 0", async () => {
        const user = userEvent.setup();
        await goToCartAfterAddingOneProduct(user);

        const plusBtn = screen.getByRole("button", { name: /\+/ });
        const minusBtn = screen.getByRole("button", { name: /-/ });
        const countDisplay = screen.getByTestId("count");

        expect(countDisplay.textContent).toBe("1");
        console.log("yo1")

        await user.click(plusBtn);
        await waitFor(() => {
            expect(countDisplay.textContent).toBe("2");
        });
        console.log("yo2")

        await user.click(minusBtn);
        await waitFor(() => {
            expect(countDisplay.textContent).toBe("1");
        });
        console.log("yo3")

        await user.click(minusBtn);
        await waitFor(() => {
            expect(screen.queryByText("Keyboard")).not.toBeInTheDocument();
            expect(screen.queryByRole("button", { name: /checkout/i })).not.toBeInTheDocument();
            expect(screen.getByRole("heading", { name: /Looks like you have nothing on your cart!/i })).toBeInTheDocument();
        });
    });
});