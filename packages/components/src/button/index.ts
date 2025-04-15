import _Button from './button.vue';
import type { App, Plugin, Component } from 'vue';
type SFCWithInstall = Component & Plugin;

// Wrapping each SFC with an install function makes it callable as a plugin by app.use() (Vue3)
// the SFC's install function results in it being globally registered in Vue app
const withInstall = (comp: Component) => {
  (comp as SFCWithInstall).install = (app: App) => {
    // Extract component name from file path or use default
    if (typeof comp.name === 'undefined') {
      throw new Error('Component registry name not defined');
    }
    app.component(comp.name, comp);
  };
  return comp as SFCWithInstall;
};

export const Button = withInstall(_Button);
export default Button;
