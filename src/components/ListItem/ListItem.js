import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import colors from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import {selectedDog, addToFavorites, removeFromFavorites} from '../../actions';
import heartImg from '../../images/heart.png';
import heartFilledImg from '../../images/heartFilled.png';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import {dateFormatter} from '../../utils/dateFormatter';
import strings from './strings';
import Device from 'react-native-device-detection';

class ListItem extends Component {
  getFavoriteIcon = () => {
    return this.props.favorites.includes(this.props.item)
      ? heartFilledImg
      : heartImg;
  };

  handleFavorite = () => {
    const {favorites, item} = this.props;
    if (this.props.signedIn) {
      if (favorites.includes(item)) {
        this.props.removeFromFavorites(item);
      } else {
        //bounce the heart when adding to favorites
        this.refs[strings.refs.bounce]
          .bounce(500)
          .then(this.props.addToFavorites(item));
      }
    } else {
      this.props.navigation.navigate(strings.navigation.signIn);
    }
  };

  render() {
    const imageWrapper = (
      <View style={styles.imageWrapper}>
        <Image
          source={{uri: this.props.item.key}}
          style={styles.blurredImage}
          blurRadius={20}
        />
        <Image
          source={{uri: this.props.item.key}}
          style={styles.image}
          resizeMode="contain"
        />
        <Animatable.View ref={strings.refs.bounce} style={styles.animatable}>
          {/* icon by Smash Icons */}
          <TouchableWithoutFeedback
            style={styles.favorite}
            onPress={() => {
              this.handleFavorite();
            }}>
            <Image source={this.getFavoriteIcon()} style={styles.heart} />
          </TouchableWithoutFeedback>
        </Animatable.View>
      </View>
    );

    const quickDetailsRowOne = (
      <View style={styles.quickDetailsRow}>
        <Text style={styles.location}>
          {strings.location} {this.props.item.location}
        </Text>
        <View style={styles.price}>
          <Text>{strings.price} </Text>
          <Text style={styles.coloredPrice}>{this.props.item.price}</Text>
        </View>
      </View>
    );

    const quickDetailsRowTwo = (
      <View style={styles.quickDetailsRow}>
        <Text style={styles.breed}>{this.props.item.breed}</Text>
        <Text style={styles.date}>{dateFormatter(this.props.item.date)}</Text>
      </View>
    );

    return (
      <View style={styles.parent}>
        <TouchableHighlight
          style={styles.touchable}
          onPress={() => {
            this.props.selectedDog(this.props.item);
            this.props.navigation.navigate(strings.navigation.dogProfile);
          }}
          underlayColor={colors.notQuiteWhite}>
          <View style={styles.contentWrapper}>
            {imageWrapper}
            <View style={styles.detailsWrapper}>
              {quickDetailsRowOne}
              {quickDetailsRowTwo}
              <Text style={styles.description}>
                {this.props.item.description}
              </Text>
              <LinearGradient
                colors={
                  Device.isTablet
                    ? [
                        'rgba(238, 238, 238, 0.0)',
                        'rgba(238, 238, 238, 0.8)',
                        colors.notQuiteWhite,
                      ]
                    : [
                        'rgba(238, 238, 238, 0.0)',
                        'rgba(238, 238, 238, 0.8)',
                        colors.white,
                      ]
                }
                style={styles.fade}
              />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

ListItem.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      routeName: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }).isRequired,
    actions: PropTypes.object.isRequired,
  }),
};

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    signedIn: state.signedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectedDog: dog => {
      dispatch(selectedDog(dog));
    },
    addToFavorites: dog => {
      dispatch(addToFavorites(dog));
    },
    removeFromFavorites: dog => {
      dispatch(removeFromFavorites(dog));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
