import * as components from "./index";

// for Volar VSCode hinting
// When users use the component library,
// they need to configure types: ["<project>/lib/src/components"]
// in their tsconfig.json to enable the hinting functionality

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    IMHOButton: typeof components.Button;
  }
}
export {};
