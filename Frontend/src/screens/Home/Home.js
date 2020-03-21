import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import colors from '../../colors';
import ListItem from '../../components/ListItem';
import LeftButton from '../../components/LeftButton';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {breedsList, toggleError} from '../../actions';
import {loadAllDogsInSystem} from '../../utils/generator';
import store from '../../store';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import strings from './strings';

IconEntypo.loadFont();

class Home extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        /**
         * consider reenabling drawer if there are enough items to populate it
         */
        <View style={{flexDirection: 'row'}}>
          <IconEntypo
            name="message"
            size={35}
            color={colors.contrast}
            onPress={() => {
              store.getState().signedIn
                ? navigation.navigate(strings.navigation.messages)
                : navigation.navigate(strings.navigation.signIn);
            }}
          />
          <IconAwesome
            style={{paddingRight: 10, paddingLeft: 8, paddingTop: 4}}
            name="heart"
            size={30}
            color={colors.contrast}
            onPress={() => {
              store.getState().signedIn
                ? navigation.navigate(strings.navigation.favorites)
                : navigation.navigate(strings.navigation.signIn);
            }}
          />
        </View>
      ),
      //left button changes based on whether or not user is logged in
      headerLeft: <LeftButton navigation={navigation} />,
    };
  };

  componentDidMount() {
    let count = 0;
    while (count < 10) {
      loadAllDogsInSystem();
      count++;
    }
  }

  render() {
    //shown when there is an error getting data
    const errorScreen = (
      <View style={styles.retryWrapper}>
        <View style={styles.errorTextWrapper}>
          <Text style={styles.errText}>{strings.thereWasError}</Text>
        </View>
        <View style={styles.retryBtnWrapper}>
          <TouchableHighlight
            onPress={() => {
              this.props.toggleError(false);
              this.componentDidMount();
            }}
            style={styles.errTouchable}>
            <View style={styles.retryTextWrapper}>
              <Text style={styles.retryText}>{strings.retry}</Text>
              <IconAwesome
                style={{paddingRight: 10, paddingLeft: 8}}
                name="refresh"
                size={25}
                color={colors.contrast}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );

    //need to determine if the absence of data is due to loading or network error
    const noData = this.props.error ? (
      errorScreen
    ) : (
      <ActivityIndicator size="large" color={colors.dark} style={{flex: 1}} />
    );

    const theList =
      this.props.searchResults === null ? (
        noData
      ) : (
        <FlatList
          ref={strings.refs.flatList}
          data={this.props.searchResults}
          renderItem={({item}) => (
            <ListItem item={item} navigation={this.props.navigation} />
          )}
        />
      );

    const fab = this.props.searchResults !== null && (
      <View style={styles.fab}>
        {/* filter */}
        <TouchableHighlight
          style={styles.filterTouchable}
          onPress={() => {
            this.props.navigation.navigate(strings.navigation.filter);
            this.refs[strings.refs.flatList].scrollToOffset({
              animated: true,
              offset: 0,
            });
          }}
          underlayColor={colors.dark}>
          <View style={styles.fabButton}>
            <View style={styles.fabIconWrapper}>
              <IconAwesome name="filter" size={20} color={colors.contrast} />
            </View>
            <View style={styles.fabTextWrapper}>
              <Text style={styles.text}>{strings.filter}</Text>
            </View>
          </View>
        </TouchableHighlight>
        {/* divider */}
        <View style={styles.dividerWrapper}>
          <View style={styles.divider} />
        </View>
        {/* sort */}
        <Menu>
          <MenuTrigger>
            <TouchableHighlight
              style={styles.sortTouchable}
              underlayColor={colors.dark}>
              <View style={styles.fabButton}>
                <View style={styles.fabIconWrapper}>
                  <IconMCI name="sort" size={20} color={colors.contrast} />
                </View>
                <View style={styles.fabTextWrapper}>
                  <Text style={styles.text}>{strings.sort}</Text>
                </View>
              </View>
            </TouchableHighlight>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              style={{padding: 12}}
              onSelect={() => alert(strings.underConstruction)}
              text={strings.mostRelevant}
            />
            <MenuOption
              style={{padding: 12}}
              onSelect={() => alert(strings.underConstruction)}
              text={strings.priceHighest}
            />
            <MenuOption
              style={{padding: 12}}
              onSelect={() => alert(strings.underConstruction)}
              text={strings.priceCheapest}
            />
          </MenuOptions>
        </Menu>
      </View>
    );

    return (
      <SafeAreaView style={styles.parent}>
        {/* scrollable list of dogs */}
        {theList}
        {/* manipulate search results */}
        {fab}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    breeds: state.breeds,
    searchResults: state.searchResults,
    signedIn: state.signedIn,
    error: state.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    breedsList: breeds => {
      dispatch(breedsList(breeds));
    },
    toggleError: err => {
      dispatch(toggleError(err));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
