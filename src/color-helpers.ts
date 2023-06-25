import Color from 'color';

const lightness = (val: number) => (c: Color) => c.lightness(val);

const toDefault = (names: string[]) => names.reduce((acc: Record<string, undefined>, v) => {
  acc[v] = undefined;
  return acc;
}, {});

export default {
  lightness,
  toDefault,
}