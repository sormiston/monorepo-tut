// Wrapping target SFC with an install function makes it callable as a plugin by app.use() (Vue3)
// the SFC's install function results in it being globally registered in Vue app

import { App, Plugin } from 'vue';
import type { Component } from 'vue';

export function withInstall(component: Component): Component & Plugin {
  (component as Component & Plugin).install = (app: App) => {
    if (typeof component.name === 'undefined') {
      throw new Error('Component registry name not defined');
    }
    app.component(component.name, component);
  };
  return component as Component & Plugin;
}
