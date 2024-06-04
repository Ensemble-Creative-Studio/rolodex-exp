import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from "./sanity/schemas";

const config = defineConfig({
    projectId: "j5gdcalm",
    dataset: "production",
    title: "rolodex",
    apiVersion: "2024-05-30",
    basePath: "/admin",
    plugins: [structureTool()],
    schema: { types: schemas},
});

export default config;