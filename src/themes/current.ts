import Color from 'color';
import h from '../color-helpers';

export const config = {
  primary: {
    $: undefined,
    tint: Array(3).fill(undefined),
    shade: Array(2).fill(undefined),
  },
  avatar: {
    accent: Array(2).fill(undefined),
  },
  secondary: {
    $: undefined,
    tint: Array(4).fill(undefined),
  },
  success: {
    $: undefined,
    tint: Array(2).fill(undefined),
    light: undefined,
  },
  warning: {
    $: undefined, 
    tint: Array(2).fill(undefined),
  },
  danger: {
    $: undefined,
    tint: Array(2).fill(undefined),
  },
  info: {
    $: undefined,
    tint: Array(2).fill(undefined),
  },
  grey: undefined, 
  'light-grey': undefined,
  neutral: undefined,
  text: {
    dark: undefined,
    base: undefined,
    light: undefined,
    lighter: undefined,
    xlight: undefined
  },
  foreground: {
    xdark: undefined,
    dark: undefined,
    base: undefined,
    light: undefined,
    xlight: undefined
  },
  background: {
    dark: undefined,
    base: undefined,
    light: undefined,
    lighter: undefined,
    xlight: undefined
  },
  canvas: {
    dot: undefined,
    background: undefined
  },
  sticky: {
    default: {
      background: undefined,
      border: undefined
    }
  }
}