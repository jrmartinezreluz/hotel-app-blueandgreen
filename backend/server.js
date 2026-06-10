const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

const hotel = {
  name: "Blue & Green Hotel",
  tagline: "Comfort and cuisine by the sea",
  address: "123 Harbor View, Demo City",
  checkIn: "15:00",
  checkOut: "11:00",
};

const menus = {
  winter: {
    season: "Winter comfort menu",
    items: [
      { name: "Pumpkin soup", price: "€12", note: "Chef's selection" },
      { name: "Slow-braised short rib", price: "€28", note: "Root vegetables" },
      { name: "Chocolate fondant", price: "€10", note: "Warm center" },
    ],
  },
  summer: {
    season: "Summer terrace menu",
    items: [
      { name: "Chilled gazpacho", price: "€11", note: "Garden herbs" },
      { name: "Grilled sea bass", price: "€26", note: "Citrus butter" },
      { name: "Berry pavlova", price: "€10", note: "Local berries" },
    ],
  },
};

const promotions = {
  winter: {
    headline: "Winter Escape — 25% off suites",
    details: "Book a suite before March and enjoy spa access included.",
    validUntil: "2026-03-31",
  },
  summer: {
    headline: "Sunset Terrace — free welcome cocktail",
    details: "Stay two nights and receive a cocktail on our rooftop terrace.",
    validUntil: "2026-09-30",
  },
};

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "hotel-backend" });
});

app.get("/api/hotel", (_req, res) => {
  res.json(hotel);
});

app.get("/api/menu", (req, res) => {
  const theme = req.query.theme === "summer" ? "summer" : "winter";
  res.json(menus[theme]);
});

app.get("/api/promotion", (req, res) => {
  const theme = req.query.theme === "summer" ? "summer" : "winter";
  res.json(promotions[theme]);
});

app.listen(port, () => {
  console.log(`hotel-backend listening on ${port}`);
});
