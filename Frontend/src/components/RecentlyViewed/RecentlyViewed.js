import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import MiniListItem from "../MiniListItem";
import strings from "./strings";

class RecentlyViewed extends Component {
  render() {
    return (
      <View>
        <Text style={styles.recents}>{strings.recentlyViewed}</Text>
        <FlatList
          data={this.props.recentlyViewed}
          horizontal={true}
          renderItem={({ item }) =>
            // don't show the currently selected dog in the recents
            item !== this.props.selectedDog && (
              <MiniListItem
                item={item}
                navigation={this.props.navigation}
                showFav={false}
              />
            )
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    recentlyViewed: state.recentlyViewed,
    selectedDog: state.selectedDog
  };
};

export default connect(
  mapStateToProps,
  null
)(RecentlyViewed);
