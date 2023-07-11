import express from "express";
import shopify from "../shopify.js";
import { formDB } from "../form-db.js";

export default function applyFormApiEndpoints(app) {
  app.use(express.json());

  app.get("/api/shop-data", async (req, res) => {
    try {
      // Fetch shop data using Shopify API
      const shopData = await shopify.api.rest.Shop.fetch({
        session: res.locals.shopify.session,
      });

      // Return the shop data as the response
      res.status(200).json(shopData);
    } catch (error) {
      console.error("Failed to fetch shop data:", error);
      res.status(500).json({ error: "Failed to fetch shop data" });
    }
  });

  app.post("/api/form", async (req, res) => {
    try {
      const { email } = req.body;
      const id = await formDB.create({ email });
      res.status(200).json({ id });
    } catch (error) {
      console.error("Failed to create form entry:", error);
      res.status(500).json({ error: "Failed to create form entry" });
    }
  });

  // Additional API endpoints can be added here

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });
}

