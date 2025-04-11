import * as components from "./src";
export * from "./src";
import { App } from "vue";

// Component Library bulk plugin installer
// each component is a plugin
export default {
  install(app: App) {
    Object.entries(components).forEach(([fileName, component]) => {
      try {
        app.use(component);
      } catch (error) {
        console.error("IMHO-IndustriesUI:", fileName, "\n \t", error);
      }
    });
  },
};
