import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import strings from "./strings";

class UnderConstruction extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text>{strings.underConstruction}</Text>
      </View>
    );
  }
}

export default UnderConstruction;
