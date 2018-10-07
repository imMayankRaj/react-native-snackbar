// @flow

import { NativeModules, processColor } from 'react-native';

type Action = {
  title: string,
  color?: string | number,
  onPress?: () => void,
};

type SnackBarOptions = {
  title: string,
  duration?: number,
  gravity?:number,
  backgroundColor?: string,
  action?: Action,
};

type ISnackBar = {
  LENGTH_LONG: number,
  LENGTH_SHORT: number,
  LENGTH_INDEFINITE: number,
  GRAVITY_TOP: number,
  GRAVITY_CENTER: number,
  GRAVITY_BOTTOM: number,
  show: (options: SnackBarOptions) => void,
  dismiss: () => void,
};

const SnackBar: ISnackBar = {

  LENGTH_LONG: NativeModules.RNSnackbar.LENGTH_LONG,
  LENGTH_SHORT: NativeModules.RNSnackbar.LENGTH_SHORT,
  LENGTH_INDEFINITE: NativeModules.RNSnackbar.LENGTH_INDEFINITE,
  GRAVITY_TOP: NativeModules.RNSnackbar.GRAVITY_TOP,
  GRAVITY_CENTER: NativeModules.RNSnackbar.GRAVITY_CENTER,
  GRAVITY_BOTTOM: NativeModules.RNSnackbar.GRAVITY_BOTTOM,

  show(options: SnackBarOptions) {
    const onPressCallback = (options.action && options.action.onPress) || (() => {});

    if (options.action && options.action.color) {
      /* eslint-disable no-param-reassign */
      // $FlowFixMe
      options.action.color = processColor(options.action.color);
      /* eslint-enable */
    }

    if (options.backgroundColor) {
      // eslint-disable-next-line no-param-reassign
      options.backgroundColor = processColor(options.backgroundColor);
    }

    console.log(options);
    NativeModules.RNSnackbar.show(options, onPressCallback);
  },

  dismiss() {
    NativeModules.RNSnackbar.dismiss();
  },

};

export default SnackBar;
