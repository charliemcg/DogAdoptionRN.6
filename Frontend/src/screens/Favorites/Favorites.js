import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  ImageBackground,
  View,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import colors from "../../colors";
import MiniListItem from "../../components/MiniListItem";
import backgroundImg from "../../images/backgroundWhite.png";
import RecentlyViewed from "../../components/RecentlyViewed";
import strings from "./strings";
import Device from "react-native-device-detection";

class Favorites extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colors.primary
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      fakeLoading: false
    };
  }

  render() {
    // list of favorites
    const thereAreFavorites = (
      <FlatList
        style={styles.list}
        data={this.props.favorites}
        numColumns={Device.isTablet ? 3 : 2}
        renderItem={({ item }) => (
          <MiniListItem
            item={item}
            navigation={this.props.navigation}
            showFav={true}
            fakeLoad={() => {
              this.setState({ fakeLoading: true });
              setTimeout(() => {
                this.setState({ fakeLoading: false });
              }, 350);
            }}
          />
        )}
      />
    );

    // recently viewed dogs
    const recents = (
      <View style={styles.recents}>
        <RecentlyViewed navigation={this.props.navigation} showFav={false} />
      </View>
    );

    // inform user there are no favorites
    const thereAreNoFavorites = (
      <View style={styles.noFavoritesWrapper}>
        <View style={styles.noFavorites}>
          <Text style={styles.noFavoritesText}>
            {strings.youHaveNoFavorites}
          </Text>
        </View>
        {/* check there are recents to view */}
        {this.props.recentlyViewed.length > 1 && recents}
      </View>
    );

    return (
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={backgroundImg}
      >
        <SafeAreaView style={styles.parent}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{strings.yourFavorites}</Text>
          </View>
          {/* show activity indicator so user knows fav removal is processing */}
          {this.state.fakeLoading ? (
            <ActivityIndicator
              size="large"
              color={colors.dark}
              style={{ flex: 1 }}
            />
          ) : // check if favorites exist
          this.props.favorites.length === 0 ? (
            thereAreNoFavorites
          ) : (
            thereAreFavorites
          )}
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    recentlyViewed: state.recentlyViewed
  };
};

export default connect(
  mapStateToProps,
  null
)(Favorites);
