import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routes from "../routes";
import Header from '../components/Header';
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";

describe("Header component", () => {
    it("renders correctly", () => {
        const { container } = render(
            <MemoryRouter>
                <Header cartCounter={0}></Header>
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    it("cart counter updates correctly after a product is added", async () => {
        const user = userEvent.setup();

        const router = createMemoryRouter(routes, {
            initialEntries: ["/product/1"],
        });

        render(<RouterProvider router={router} />);

        await screen.findByRole("button", { name: /add to cart/i });

        const counter = document.querySelector(".cart-counter");
        expect(counter?.textContent).toBe("0");

        await user.click(screen.getByRole("button", { name: /add to cart/i }));

        await waitFor(() => {
            expect(counter?.textContent).toBe("1");
        });
    });
});
