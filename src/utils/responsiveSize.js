import {PixelRatio} from 'react-native';

const devicePixelRatio = PixelRatio.get();

export function responsiveSize(size) {
  return size * ((devicePixelRatio * 2) / 3);
}
