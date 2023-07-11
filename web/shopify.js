import sqlite3 from "sqlite3";
import { shopifyApp } from "@shopify/shopify-app-express";
import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";
import applyFormApiEndpoints from "./middleware/form-api.js";
import formDB from "./form-db.js";
import { join } from "path";

const database = new sqlite3.Database(join(process.cwd(), "database.sqlite"));
// Initialize SQLite DB
formDB.db = database;
formDB.init();
const shopify = shopifyApp({
  api: {
    apiVersion: "2023-04",
    restResources,
    billing: undefined, // or replace with billingConfig above to enable example billing
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  sessionStorage: new SQLiteSessionStorage(database),
});
export default shopify;
