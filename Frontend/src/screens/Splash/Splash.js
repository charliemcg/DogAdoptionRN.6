import React, {Component} from 'react';
import {View, ImageBackground, Image} from 'react-native';
import styles from './styles';
import backgroundImg from '../../images/background.png';
import titleImg from '../../images/titleNoBase.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../colors';

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 2500);
  }
  render() {
    return (
      // paw image from freepik
      <ImageBackground
        style={styles.parent}
        resizeMode="cover"
        source={backgroundImg}>
        <View style={styles.iconWrapper}>
          <Icon name="dog" size={175} color={colors.contrast} />
        </View>
        <View style={styles.titleWrapper}>
          <Image
            style={styles.titleBase}
            source={titleImg}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    );
  }
}

export default Splash;
