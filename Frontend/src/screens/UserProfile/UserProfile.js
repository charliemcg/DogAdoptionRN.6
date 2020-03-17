import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import styles from './styles';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import colors from '../../colors';
import {signInOut, setUser} from '../../actions';
import {connect} from 'react-redux';
import backgroundImg from '../../images/backgroundWhite.png';
import RecentlyViewed from '../../components/RecentlyViewed';
import strings from './strings';
import Device from 'react-native-device-detection';

class UserProfile extends Component {
  buttonSkeleton = btnProps => (
    <View style={styles.buttonWrapper}>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          this.props.navigation.navigate(btnProps.route);
        }}
        underlayColor={colors.dark}>
        <View style={styles.btnContentsWrapper}>
          {btnProps.icon}
          <Text style={styles.btnText}>{btnProps.text}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
  render() {
    const favIcon = (
      <IconAwesome name={'heart'} size={60} color={colors.contrast} />
    );
    const msgIcon = (
      <IconEntypo name={'message'} size={60} color={colors.contrast} />
    );
    const sellIcon = (
      <IconAwesome name={'dollar'} size={60} color={colors.contrast} />
    );
    const adIcon = (
      <IconAwesome5 name={'ad'} size={60} color={colors.contrast} />
    );

    return (
      <ImageBackground
        style={styles.parent}
        resizeMode="cover"
        source={backgroundImg}>
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            {/* icon */}
            <View style={styles.iconWrapper}>
              <IconAwesome5
                name="user-circle"
                size={150}
                color={colors.primary}
              />
            </View>
            {/* personal details */}
            <View style={styles.details}>
              <Text>
                {this.props.user.first_name} {this.props.user.last_name}
              </Text>
              <Text>{strings.street}</Text>
              <Text>{this.props.user.location}</Text>
              <Text>{this.props.user.username}</Text>
            </View>
            {/* recently view */}
            {/* only show if there are recent dogs in the array. The currently selected dog does not count. */}
            {this.props.recentlyViewed.length > 1 && (
              <View style={styles.recents}>
                <RecentlyViewed
                  navigation={this.props.navigation}
                  showFav={false}
                />
              </View>
            )}
            <View style={styles.gridRow}>
              {/* sell dog */}
              {this.buttonSkeleton({
                route: strings.navigation.underConstruction,
                icon: sellIcon,
                text: strings.sellADog,
              })}
              {/* view ads */}
              {this.buttonSkeleton({
                route: strings.navigation.underConstruction,
                icon: adIcon,
                text: strings.viewMyAds,
              })}
            </View>
            <View style={styles.gridRow}>
              {/* view favourites */}
              {this.buttonSkeleton({
                route: strings.navigation.favorites,
                icon: favIcon,
                text: strings.viewFavorites,
              })}
              {/* view messages */}
              {this.buttonSkeleton({
                route: strings.navigation.messages,
                icon: msgIcon,
                text: strings.viewMessages,
              })}
            </View>
            {/* sign out */}
            <View style={styles.signOutBtnWrapper}>
              <TouchableHighlight
                style={styles.signOutBtn}
                onPress={() => {
                  this.props.signInOut();
                  this.props.setUser();
                  this.props.navigation.navigate(strings.navigation.home);
                }}
                underlayColor={colors.dark}>
                <View style={styles.signOutContentsWrapper}>
                  <Text style={styles.btnText}>{strings.signOut}</Text>
                  <IconAwesome
                    name="sign-out"
                    size={Device.isTablet ? 60 : 40}
                    color={colors.contrast}
                    style={styles.signOutIcon}
                  />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.resolutionWrapper}>
              <Text>{strings.gotAQuestion}</Text>
              <Text
                style={{color: colors.dark}}
                onPress={() =>
                  this.props.navigation.navigate(
                    strings.navigation.underConstruction,
                  )
                }>
                {strings.getInTouch}
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    recentlyViewed: state.recentlyViewed,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signInOut: () => {
      dispatch(signInOut());
    },
    setUser: () => {
      const user = {
        firstName: null,
        lastName: null,
        username: null,
        location: null,
        password: null,
      };
      dispatch(setUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
