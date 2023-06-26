import Color from 'color';
import h from '../color-helpers';

export const config = {
  primary: {
    $: '#E26838',
    tint: [18, 9, 3].map(h.lightness),
    shade: [45, 80].map(h.lightness),
  },
  avatar: {
    accent: Array(2).fill(undefined)
  },
  secondary: {
    $: undefined,
    tint: [20, 12, 5, 2].map(h.lightness)
  },
  success: {
    $: undefined,
    tint: [10, 5].map(h.lightness),
    light: undefined,
  },
  warning: {
    $: undefined, 
    tint: Array(2).fill(undefined),
  },
  danger: {
    $: undefined,
    tint: [7, 4].map(h.lightness),
  },
  info: {
    $: undefined,
    tint: [12, 4].map(h.lightness),
  },
  grey: undefined, 
  'light-grey': undefined,
  neutral: undefined,
  text: {
    dark: '#9a9a9a', 
    base: '#939393', 
    light: undefined, 
    lighter: 'hsl(220, 15%, 60%)', 
    xlight: '#ffffff'
  },
  foreground: {
    xdark: undefined, 
    dark: undefined, 
    base: '#ffb8a0', 
    light: undefined, 
    xlight: '#f2f2f2'
  },
  background: {
    dark: undefined, 
    base: '#bebebe', 
    light: '#373737', // 222222
    lighter: undefined, 
    xlight: '#111111'
  },
  canvas: {
    dot: '#6a6a6a', 
    background: '#373737'
  },
  sticky: {
    default: {
      background: undefined, 
      border: undefined
    }
  }
}