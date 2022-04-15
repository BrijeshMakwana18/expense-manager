/* eslint-disable no-undef */
import {StyleSheet, Platform} from 'react-native';
import {colors, perfectSize, fonts} from '../../theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: perfectSize(Platform.OS == 'ios' ? 56 : 40),
  },
  firstContainer: {
    flex: 1,
    width: '100%',
    height: '50%',
    backgroundColor: colors.activeButtonBackgroundColor,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  secondContainer: {
    flex: 1,
    width: '100%',
    height: '50%',
    backgroundColor: colors.debitTransactionAmountColor,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
