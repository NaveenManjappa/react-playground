import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import axios from "axios";
import { OrdersPage } from "./OrdersPage";

vi.mock("axios");

describe("OrdersPage component", () => {
  beforeEach(() => {
    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "api/orders?expand=products") {
        return {
          data: [
            {
              id: "order-1",
              orderTimeMs: 1728000000000,
              totalCostCents: 5185,
              products: [
                {
                  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                  quantity: 2,
                  estimatedDeliveryTimeMs: 1729000000000,
                  product: {
                    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                    rating: {
                      stars: 4.5,
                      count: 87,
                    },
                    priceCents: 1090,
                  },
                },
                {
                  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                  quantity: 1,
                  estimatedDeliveryTimeMs: 1729500000000,
                  product: {
                    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    image:
                      "images/products/intermediate-composite-basketball.jpg",
                    name: "Intermediate Size Basketball",
                    rating: {
                      stars: 4,
                      count: 127,
                    },
                    priceCents: 2095,
                  },
                },
              ],
            },
            {
              id: "order-2",
              orderTimeMs: 1727000000000,
              totalCostCents: 3280,
              products: [
                {
                  productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                  quantity: 3,
                  estimatedDeliveryTimeMs: 1728500000000,
                  product: {
                    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                    image:
                      "images/products/adults-plain-cotton-tshirt-2-pack.jpg",
                    name: "Adults Plain Cotton T-Shirt - 2 Pack",
                    rating: {
                      stars: 4.5,
                      count: 56,
                    },
                    priceCents: 799,
                  },
                },
              ],
            },
          ],
        };
      }
    });
  });

  it("displays the orders correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <OrdersPage cart={[]} />
      </MemoryRouter>
    );

    // Wait for the orders to load
    await screen.findByText("order-1");

    const orderContainers = container.querySelectorAll(".order-container");

    expect(orderContainers.length).toBe(2);
  });

  it("displays order details correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <OrdersPage cart={[]} />
      </MemoryRouter>
    );

    // Wait for the orders to load
    await screen.findByText("order-1");

    const orderContainers = container.querySelectorAll(".order-container");

    // Check first order
    expect(within(orderContainers[0]).getByText("order-1")).toBeInTheDocument();
    expect(
      within(orderContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs"
      )
    ).toBeInTheDocument();
    expect(
      within(orderContainers[0]).getByText("Intermediate Size Basketball")
    ).toBeInTheDocument();

    // Check second order
    expect(within(orderContainers[1]).getByText("order-2")).toBeInTheDocument();
    expect(
      within(orderContainers[1]).getByText(
        "Adults Plain Cotton T-Shirt - 2 Pack"
      )
    ).toBeInTheDocument();
  });

  it("displays product quantities correctly", async () => {
    const { container } = render(
      <MemoryRouter>
        <OrdersPage cart={[]} />
      </MemoryRouter>
    );

    // Wait for the orders to load
    await screen.findByText("order-1");

    const orderContainers = container.querySelectorAll(".order-container");

    // First order should have 2 products with quantities
    expect(
      within(orderContainers[0]).getByText("Quantity: 2")
    ).toBeInTheDocument();
    expect(
      within(orderContainers[0]).getByText("Quantity: 1")
    ).toBeInTheDocument();

    // Second order should have 1 product with quantity 3
    expect(
      within(orderContainers[1]).getByText("Quantity: 3")
    ).toBeInTheDocument();
  });

  it("displays track package buttons for each product", async () => {
    render(
      <MemoryRouter>
        <OrdersPage cart={[]} />
      </MemoryRouter>
    );

    const trackButtons = await screen.findAllByText("Track package");

    // Should have 3 track buttons (2 products in first order + 1 product in second order)
    expect(trackButtons.length).toBe(3);
  });

  it("displays buy again buttons for each product", async () => {
    render(
      <MemoryRouter>
        <OrdersPage cart={[]} />
      </MemoryRouter>
    );

    const buyAgainButtons = await screen.findAllByText("Add to Cart");

    // Should have 3 buy again buttons (2 products in first order + 1 product in second order)
    expect(buyAgainButtons.length).toBe(3);
  });
});
