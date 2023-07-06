import { getCssVarName, traverseTree } from '../src/utils';
import h from '../src/color-helpers';

const config = {
  primary: {
    $: 'light-gray',
    tint: [88, 94.5, 96.9].map(h.lightness),
    shade: [57.6, 23].map(h.lightness),
  },
  avatar: {
    accent: Array(2).fill(undefined)
  },
  gray: '#333333',
  'light-grey': undefined,
  sticky: {
    notes: {
      workspace: {
        body: h.toDefault(['background', 'border'])
      }
    }
  }
}

type Path = Array<string | number>;
type Fn = (path: Path, value: any) => void;

const expandTree = (tree: object): Record<string, string> => {
  const result: Record<string, string> = {};
  const fn: Fn = (path, value) => {
    const cssVarName = getCssVarName(path);
    if (typeof (value) === 'function') {
      result[cssVarName] = '<computed>';
    } else {
      const v = value === undefined ? '<get from n8n>' : value;
      result[cssVarName] = v;
    }
  }
  
  traverseTree(tree, fn)
  
  return result;
}

const colors: Record<string, string> = Object.fromEntries(
  Object.entries(
    expandTree(config)
  ).sort(
    ([name, [accessor, setter]]) => 0 //setter === undefined ? 1 : -1
  )
);

console.log(colors);