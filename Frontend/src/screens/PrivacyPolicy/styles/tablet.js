import colors from '../../../colors';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

export default {
  parent: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    margin: 10,
  },
};
