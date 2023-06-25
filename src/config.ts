import h from './color-helpers';

export const config = {
  primary: {
    $: undefined,
    tint: [88, 94.5, 96.9].map(h.lightness),
    shade: [57.6, 23].map(h.lightness),
  },
  avatar: {
    accent: Array(2).fill(undefined)
  },
  secondary: {
    $: undefined,
    tint: [85, 92, 95, 98].map(h.lightness)
  },
  success: {
    $: undefined,
    tint: [90, 94.9].map(h.lightness),
    light: undefined,
  },
  warning: {
    $: undefined, 
    tint: Array(2).fill(undefined),
  },
  danger: {
    $: undefined,
    tint: [93.9, 96.9].map(h.lightness),
  },
  info: {
    $: undefined,
    tint: [88, 96].map(h.lightness),
  },
  grey: undefined, 
  'light-grey': undefined,
  neutral: undefined,
  text: h.toDefault(['dark', 'base', 'light', 'lighter', 'xlight']),
  foreground: h.toDefault(['xdark', 'dark',  'base', 'light', 'xlight']),
  background: h.toDefault(['dark', 'base', 'light', 'lighter', 'xlight']),
  canvas: h.toDefault(['dot', 'background']),
  sticky: {
    default: h.toDefault(['background', 'border'])
  }
}