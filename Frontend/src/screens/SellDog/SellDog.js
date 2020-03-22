import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import styles from './styles';
import colors from '../../colors';
import {connect} from 'react-redux';
import backgroundImg from '../../images/backgroundWhite.png';
import strings from './strings';

class SellDog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dog: {
        breed: '',
        price: '',
        location: this.props.user.location,
        description: '',
        date: String(
          new Date().getTime() -
            Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 21),
        ),
        user: this.props.user.username,
      },
    };
  }

  onChangeBreed(text) {
    this.setState({
      dog: {
        ...this.state.dog,
        breed: text,
      },
    });
  }

  onChangePrice(text) {
    this.setState({
      dog: {
        ...this.state.dog,
        price: text,
      },
    });
  }

  onChangeDescription(text) {
    this.setState({
      dog: {
        ...this.state.dog,
        description: text,
      },
    });
  }

  updateBackend() {
    fetch(strings.dogApi, {
      method: 'POST',
      headers: {
        Accept: strings.applicationJson,
        'Content-Type': strings.applicationJson,
      },
      body: JSON.stringify(this.state.dog),
    })
      .then(() => {
        this.props.navigation.navigate(strings.navigation.userProfile);
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <ImageBackground
        style={styles.parent}
        resizeMode="cover"
        source={backgroundImg}>
        <SafeAreaView>
          <KeyboardAvoidingView behavior="padding" enabled>
            <ScrollView style={styles.scrollView}>
              {/* breed */}
              {/* TODO change this to a picker */}
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder={strings.breed}
                  onChangeText={text => this.onChangeBreed(text)}
                />
              </View>
              {/* price */}
              {/* TODO change this to a picker */}
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder={strings.price}
                  onChangeText={text => this.onChangePrice(text)}
                />
              </View>
              {/* description */}
              {/* TODO add a chracter limit */}
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder={strings.description}
                  onChangeText={text => this.onChangeDescription(text)}
                />
              </View>
              <View style={styles.textInputWrapper}>
                <TouchableHighlight
                  onPress={() => {
                    this.updateBackend();
                  }}
                  underlayColor={colors.dark}>
                  <Text>{strings.submit}</Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(SellDog);
