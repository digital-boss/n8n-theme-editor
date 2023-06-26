import { createSignal, type Component, For, Show, JSX, createEffect, Signal } from 'solid-js';
import Color from 'color';
import styles from './App.module.css';
import { SignalOpt, expandTree } from './utils';
import { config } from './themes/dark';

const colors: Record<string, SignalOpt<Color>> = Object.fromEntries(
  Object.entries(
    expandTree(config)
  ).sort(
    ([name, [accessor, setter]]) => 0 //setter === undefined ? 1 : -1
  )
);

// for (let [cssVarName, [accessor, setter]] of Object.entries(colors)) {
//   console.log(`${cssVarName}: ${accessor()}; ${setter === undefined ? 'undefined': ''}`);
// }

document.addEventListener('coloris:pick', (event: any) => {
  const cssVarName = event.detail.currentEl.dataset.color;
  const n8n = document.getElementById('n8n') as any;
  n8n.contentWindow.document.documentElement.style.setProperty(cssVarName, event.detail.color);
});

const App: Component = () => {

  const handleInputChange: JSX.ChangeEventHandler<HTMLInputElement, Event> = (e) => {
    const { dataset, value } = e.currentTarget;
    const { color } = dataset;
    const [_, setter] = colors[color!];
    const v = Color(value);
    if (setter !== undefined) {
      setter(v);
    }
  };

  return (
    <div class={styles.App}>
      <header class={styles.header}>

        <For each={Object.entries(colors)}>{([varName, [accessor, setter]]) => 
          <div class={styles.item}>
            <span>{varName}:</span>
            <Show 
              when={setter !== undefined}
              fallback={<div style={{background: accessor().hex()}} class={styles.box}></div>}
            >
              <input data-color={varName} type="text" data-coloris onChange={handleInputChange} value={accessor().hex()}></input>
            </Show>
          </div>
        }</For>

        
      </header>
    </div>
  );
};

export default App;
