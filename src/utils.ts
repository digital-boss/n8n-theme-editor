import Color from 'color';
import { createSign } from 'crypto';
import type { Accessor, Setter, Signal } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
type Path = Array<string | number>;
type Fn = (path: Path, value: any) => void;

const arrayToObj = (arr: any[]) => Object.fromEntries(arr.map((item, idx) => [idx+1, item]))

const traverseTree = (tree: object, fn: Fn, path: Path = []) => {
  for (let [key, value] of Object.entries(tree)) {
    if (typeof (value) === 'object') {
      const t = value instanceof Array ? arrayToObj(value) : value;
      traverseTree(t, fn, [...path, key]);
    } else {
      fn([...path, key], value);
    }
  }
}

const getCssVarName = (path: Path) => {
  const lastKey = path[path.length - 1];
  const p = lastKey === '$' ? path.slice(0, -1) : path;
  return ['--color', ...p].join('-');
}

const getCurrentValue = (cssVarName: string) => {
  const iframe = document.getElementById('n8n') as any;
  const iframeContent = iframe.contentWindow.document;
  const iframeRootStyles = iframeContent.defaultView.getComputedStyle(iframeContent.documentElement);
  return iframeRootStyles.getPropertyValue(cssVarName);
}

export type SignalOpt<T> = [get: Accessor<T>, set: Setter<T> | undefined];

export const expandTree = (tree: object): Record<string, SignalOpt<Color>> => {
  const result: Record<string, SignalOpt<Color>> = {};
  
  const getParentAccessor = (path: Path): [name: string, accessor: Accessor<Color>] => {
    let i = -1;
    let name: string
    let signal: SignalOpt<Color>
    do {
      name = getCssVarName(path.slice(0, i--));
      signal = result[name];
    }
    while (signal === undefined);
    return [name, signal[0]];
  }

  const fn: Fn = (path, value) => {
    const cssVarName = getCssVarName(path);
    // console.log(`cssVarName: ${cssVarName}`);
    if (typeof (value) === 'function') {
      const [_, parentAccessor] = getParentAccessor(path);
      const derivedSignal = () => value(parentAccessor()) as Color;
      createEffect(() => {
        const n8n = document.getElementById('n8n') as any;
        n8n.contentWindow.document.documentElement.style.setProperty(cssVarName, derivedSignal());
      });
      result[cssVarName] = [derivedSignal, undefined];
    } else {
      const defaultValue = value === undefined ? getCurrentValue(cssVarName) : value;
      const defaultValue2 = defaultValue.replace(/\s+/g, '')
      // console.log(`${cssVarName} = ${defaultValue2}`)
      const signal = createSignal(Color(defaultValue2));
      createEffect(() => {
        const n8n = document.getElementById('n8n') as any;
        n8n.contentWindow.document.documentElement.style.setProperty(cssVarName, signal[0]());
      });
      result[cssVarName] = signal;
    }
  }
  
  traverseTree(tree, fn)
  
  return result;
}