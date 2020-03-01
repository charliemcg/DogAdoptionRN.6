import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import ModalSelector from 'react-native-modal-selector';
import colors from '../../colors';
import {setSearchFilters, setResults} from '../../actions';
import {getDogs} from '../../utils/searchAlgorithm';
import constants from '../../constants';
import {TouchableHighlight} from 'react-native-gesture-handler';
import IconAwesome, {FA5Style} from 'react-native-vector-icons/FontAwesome5';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import strings from './strings';
import Device from 'react-native-device-detection';

// IconAwesome.loadFont();

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        breed: this.props.searchFilters.breed,
        location: this.props.searchFilters.location,
        priceMin: this.props.searchFilters.priceMin,
        priceMax: this.props.searchFilters.priceMax,
      },
      loading: false,
      locationsExpanded: false,
    };
  }

  componentWillMount() {
    //the animatable view needs an animated value
    this.animatedValue = new Animated.Value(1);
  }

  //locations must be expanded before user can select an option. Buttons are too small and too close together
  handleLocationView = location => {
    if (this.state.locationsExpanded || Device.isTablet) {
      !Device.isTablet && this.expandLocations();
      this.asyncUpdate({
        ...this.state.filters,
        location: constants.states[location],
      });
      this.setState({locationsExpanded: false});
    } else {
      this.expandLocations();
      this.setState({locationsExpanded: true});
    }
  };

  //expand location view
  expandLocations = () => {
    Animated.spring(this.animatedValue, {
      toValue: this.state.locationsExpanded ? 1 : 1.3,
    }).start();
  };

  //called every time the user changes a filter
  updateResults = () => {
    this.props.setSearchFilters(this.state.filters);
    //briefly showing the activity indicator for better UX. The actual update time is nearly instant
    this.setState({loading: true});
    setTimeout(() => this.setState({loading: false}), 1000);
    getDogs();
  };

  //these are the options for the minimum price modal selector
  minPrices = () => {
    let {priceMax} = this.state.filters;
    const upperRange =
      priceMax === null ? 2000 : priceMax === strings.free ? 0 : priceMax;
    let prices = [];
    //make it so that user cannot select a value greater than the selected maximum
    for (let i = 0; i <= upperRange; i += 100) {
      prices.push({key: i / 10, label: i === 0 ? strings.free : i});
    }
    return prices;
  };

  //these are the options for the maximum price modal selector
  maxPrices = () => {
    const {priceMin} = this.state.filters;
    let prices = [];
    //make it so that user cannot select a value lower than the selected minimum
    for (
      let i = priceMin === null ? 0 : priceMin === strings.free ? 0 : priceMin;
      i <= 2000;
      i += 100
    ) {
      prices.push({key: i / 10, label: i === 0 ? strings.free : i});
    }
    return prices;
  };

  //the matches. either return match figures or loading indicator
  matchData = () => {
    return this.state.loading ? (
      <ActivityIndicator
        size="small"
        color={colors.dark}
        style={styles.activityIndicator}
      />
    ) : (
      <View>
        <Text>{this.props.exactMatches}</Text>
        <Text>{this.props.searchResults.length}</Text>
      </View>
    );
  };

  //The radio buttons for selecting location
  stateButton = location => {
    return (
      <View style={stateStyle(constants.states[location])}>
        <Text
          style={{textAlign: 'center'}}
          onPress={() => {
            this.handleLocationView(location);
          }}>
          {constants.states[location]}
        </Text>
      </View>
    );
  };

  // need to ensure that state is updated before updating the results
  asyncUpdate = async nullifiedState => {
    await this.setState({filters: nullifiedState});
    this.updateResults();
  };

  //this is the layout for each of the filter options. To be populated with data relevant to the each filter
  filterOptionSkeleton = props => {
    return (
      <View style={styles.optionWrapper}>
        <View style={styles.optionWrapperLeft}>
          <View style={styles.iconWrapper}>{props.icon}</View>
        </View>
        <View style={styles.optionWrapperRight}>
          <View style={styles.topRightWrapper}>
            <View style={styles.textWrapper}>
              <Text style={styles.nameText}>{props.filterName}</Text>
            </View>
            {props.showReset && (
              <IconMCI
                name="close"
                size={20}
                color="#333"
                onPress={() => {
                  switch (props.filterName) {
                    case strings.breed:
                      this.asyncUpdate({...this.state.filters, breed: null});
                      break;
                    case strings.location:
                      this.asyncUpdate({
                        ...this.state.filters,
                        location: null,
                      });
                      break;
                    case strings.price:
                      this.asyncUpdate({
                        ...this.state.filters,
                        priceMin: null,
                        priceMax: null,
                      });
                      break;
                  }
                }}
              />
            )}
          </View>
          {props.filterOptions}
        </View>
      </View>
    );
  };

  render() {
    //used for animating the location options view
    const animatedStyle = {
      transform: [{scale: this.animatedValue}],
    };

    //the modal selector for choosing a breed
    const breedOptions = (
      <View style={styles.modalSelectorWrapper}>
        <ModalSelector
          style={styles.modalSelector}
          data={this.props.breeds}
          initValue={
            this.state.filters.breed === null
              ? strings.select
              : this.state.filters.breed
          }
          onChange={option => {
            this.asyncUpdate({...this.state.filters, breed: option.label});
          }}
          selectTextStyle={{
            color: colors.black,
          }}
          optionTextStyle={{
            color: colors.notQuiteBlack,
          }}
        />
      </View>
    );

    //selected state has to look different to every other state
    stateStyle = location => {
      return this.state.filters.location === location
        ? styles.selectedState
        : styles.state;
    };

    //custom radio buttons for selecting location
    const locationOptions = (
      <Animated.View
        style={[
          styles.statesWrapper,
          animatedStyle,
          this.state.locationsExpanded ? styles.expandedStatesWrapper : null,
        ]}>
        <View style={styles.statesRow}>
          {this.stateButton(0)}
          {this.stateButton(1)}
          {this.stateButton(3)}
          {this.stateButton(6)}
        </View>
        <View style={styles.statesRow}>
          {this.stateButton(2)}
          {this.stateButton(4)}
          {this.stateButton(5)}
          {this.stateButton(7)}
        </View>
      </Animated.View>
    );

    //selectors for choosing price range
    const priceOptions = (
      <View style={styles.priceWrapper}>
        <View style={styles.minPriceWrapper}>
          <Text style={styles.priceText}>{strings.priceMin}</Text>
          <View style={styles.priceSelectorWrapper}>
            <ModalSelector
              style={styles.priceSelector}
              data={this.minPrices()}
              initValue={
                this.state.filters.priceMin === null
                  ? strings.select
                  : this.state.filters.priceMin
              }
              onChange={option => {
                this.asyncUpdate({
                  ...this.state.filters,
                  priceMin: option.label,
                });
              }}
              selectTextStyle={{
                color: colors.black,
              }}
              optionTextStyle={{
                color: colors.notQuiteBlack,
              }}
            />
          </View>
        </View>
        <View style={styles.maxPriceWrapper}>
          <Text style={styles.priceText}>{strings.priceMax}</Text>
          <View style={styles.priceSelectorWrapper}>
            <ModalSelector
              style={styles.priceSelector}
              data={this.maxPrices()}
              initValue={
                this.state.filters.priceMax === null
                  ? strings.select
                  : this.state.filters.priceMax
              }
              onChange={option => {
                this.asyncUpdate({
                  ...this.state.filters,
                  priceMax: option.label,
                });
              }}
              selectTextStyle={{
                color: colors.black,
              }}
              optionTextStyle={{
                color: colors.notQuiteBlack,
              }}
            />
          </View>
        </View>
      </View>
    );

    const breedIcon = (
      <IconAwesome
        name="dog"
        size={Device.isTablet ? 70 : 45}
        color={colors.primary}
      />
    );
    const locationIcon = (
      <IconEntypo
        name="location-pin"
        size={Device.isTablet ? 70 : 45}
        color={colors.primary}
      />
    );
    const priceIcon = (
      <IconAwesome
        name="dollar-sign"
        size={Device.isTablet ? 70 : 45}
        color={colors.primary}
      />
    );

    //everytime user chooses a filter option the number of matches gets updated
    const matches = (
      <View style={styles.matchesCountWrapper}>
        <View style={styles.matchesLabels}>
          <Text>{strings.exactMatches}</Text>
          <Text>{strings.closeMatches}</Text>
        </View>
        <View style={styles.matchesValues}>{this.matchData()}</View>
      </View>
    );

    const updateButton = (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate(strings.navigation.home)}
        style={styles.updateBtn}
        underlayColor={colors.dark}>
        <Text style={styles.btnText}>{strings.updateSearch}</Text>
      </TouchableHighlight>
    );

    return (
      <View style={styles.parent}>
        <SafeAreaView style={styles.parent}>
          {/* breed selector */}
          {this.filterOptionSkeleton({
            icon: breedIcon,
            filterName: strings.breed,
            filterOptions: breedOptions,
            showReset: this.state.filters.breed === null ? false : true,
          })}
          {/* location selector */}
          {this.filterOptionSkeleton({
            icon: locationIcon,
            filterName: strings.location,
            filterOptions: locationOptions,
            showReset: this.state.filters.location === null ? false : true,
          })}
          {/* price selector */}
          {this.filterOptionSkeleton({
            icon: priceIcon,
            filterName: strings.price,
            filterOptions: priceOptions,
            showReset:
              this.state.filters.priceMin === null
                ? this.state.filters.priceMax === null
                  ? false
                  : true
                : true,
          })}
          {/* number of matches */}
          {matches}
          {/* apply changes button */}
          {updateButton}
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchFilters: state.searchFilters,
    searchResults: state.searchResults,
    exactMatches: state.exactMatches,
    breeds: state.breeds,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchFilters: filters => {
      dispatch(setSearchFilters(filters));
    },
    setResults: results => {
      dispatch(setResults(results));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
