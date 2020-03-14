import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import colors from '../../colors';
import {addToFavorites, removeFromFavorites, addToRecents} from '../../actions';
import heartImg from '../../images/heart.png';
import heartFilledImg from '../../images/heartFilled.png';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Map from '../../components/Map';
import * as Animatable from 'react-native-animatable';
import RecentlyViewed from '../../components/RecentlyViewed';
import {dateFormatter} from '../../utils/dateFormatter';
import {HeaderBackButton} from 'react-navigation-stack';
import Swiper from 'react-native-swiper';
import strings from './strings';

class DogProfile extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: navigation.state.params ? (
      navigation.state.params.headerLeft
    ) : (
      <HeaderBackButton
        onPress={() => navigation.goBack(null)}
        tintColor={colors.contrast}
        title={strings.back}
        backTitleVisible={true}
      />
    ),
    headerStyle: {
      backgroundColor: navigation.state.params
        ? navigation.state.params.headerStyle.backgroundColor
        : colors.primary,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      //needed for checking the character count of the user inputted message
      message: '',
      fullScreenPhoto: false,
    };
  }

  componentDidMount() {
    const {recentlyViewed, selectedDog, addToRecents} = this.props;
    //check that doesn't already exist in recents
    !recentlyViewed.includes(selectedDog) && addToRecents(selectedDog);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedDog !== prevProps.selectedDog) {
      this.refs[strings.refs.scrollRef].scrollTo({y: 0});
    }
  }

  //filled if favorited, empty if not
  getFavoriteIcon = () => {
    return this.props.favorites.includes(this.props.selectedDog)
      ? heartFilledImg
      : heartImg;
  };

  //add/remove dog from favorites
  handleFavorite = () => {
    const {favorites, selectedDog} = this.props;
    if (this.props.signedIn) {
      if (favorites.includes(selectedDog)) {
        this.props.removeFromFavorites(selectedDog);
      } else {
        //bounce the heart when adding to favorites
        this.refs[strings.refs.bounceRef]
          .bounce(500)
          .then(this.props.addToFavorites(selectedDog));
      }
    } else {
      this.props.navigation.navigate(strings.navigation.signIn);
    }
  };

  //only send message if it is valid
  handleSend = () => {
    this.state.message.length <= 750 && this.state.message.length > 0
      ? alert(strings.underConstruction)
      : this.refs[strings.refs.shakeRef].shake(500);
  };

  //record keystroke for counting the message's charachter count
  handleMessageChanged = msg => {
    this.setState({message: msg});
  };

  render() {
    const {message} = this.state;

    //returning the length of the user inputted message and coloring it red if too long
    const characterLength = (
      <Text
        style={{
          color: message.length <= 750 ? colors.fadedText : 'red',
        }}>
        {message.length}
      </Text>
    );

    const photos = (
      <View style={styles.imageWrapper}>
        <TouchableHighlight
          style={{height: '100%', width: '100%'}}
          onPress={() => {
            this.setState({...this.state, fullScreenPhoto: true});
            this.props.navigation.setParams({
              headerLeft: null,
              headerStyle: {
                backgroundColor: colors.black,
              },
            });
          }}>
          <View style={{height: '100%', width: '100%'}}>
            <Image
              source={{uri: this.props.selectedDog.key}}
              style={styles.blurredImage}
              blurRadius={20}
            />
            <Image
              source={{uri: this.props.selectedDog.key}}
              style={[styles.fillView, styles.image]}
              resizeMode="contain"
            />
          </View>
        </TouchableHighlight>
      </View>
    );

    const quickDetailsTopRow = (
      <View style={styles.quickDetailsRow}>
        <Text style={styles.location}>
          {strings.location} {this.props.selectedDog.location}
        </Text>
        <View style={styles.price}>
          <Text style={styles.priceText}>{strings.price} </Text>
          <Text style={styles.coloredPrice}>
            {this.props.selectedDog.price}
          </Text>
        </View>
      </View>
    );

    const quickDetailsBottomRow = (
      <View style={styles.quickDetailsRow}>
        <Text style={styles.breed}>{this.props.selectedDog.breed}</Text>
        <Text style={styles.date}>
          {dateFormatter(this.props.selectedDog.date)}
        </Text>
      </View>
    );

    const sellerDetails = (
      <View style={styles.sellerWrapper}>
        <View style={styles.sellerText}>
          <Text>{strings.uploadedBy}</Text>
          <Text
            style={styles.seller}
            onPress={() =>
              this.props.navigation.navigate(
                strings.navigation.underConstruction,
              )
            }>
            {strings.johnSmith}
          </Text>
        </View>
        <View>
          <IconAwesome5
            name="user"
            size={30}
            color={colors.fadedText}
            onPress={() =>
              this.props.navigation.navigate(
                strings.navigation.underConstruction,
              )
            }
          />
        </View>
      </View>
    );

    const messageWrapper = (
      <View style={styles.messageWrapper}>
        <View style={styles.contactTextWrapper}>
          <Text style={styles.contactText}>{strings.contactSeller}</Text>
        </View>
        <TextInput
          style={styles.message}
          multiline={true}
          placeholder={strings.dogStillAvailable}
          onChangeText={msg => this.handleMessageChanged(msg)}
        />
        <View style={styles.btnWrapper}>
          <Text style={styles.counter}>
            {characterLength}
            {strings.seven50}
          </Text>
          <Animatable.View
            ref={strings.refs.shakeRef}
            style={[
              styles.sendAnimatable,
              {
                backgroundColor:
                  message.length <= 750 && message.length > 0
                    ? colors.primary
                    : colors.fadedText,
              },
            ]}>
            <TouchableWithoutFeedback
              //button only active if there is a valid message to send
              onPress={() => this.handleSend()}>
              <View style={styles.fillView}>
                <Text>{strings.send}</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animatable.View>
        </View>
      </View>
    );

    const recents = (
      <View style={styles.recents}>
        <RecentlyViewed navigation={this.props.navigation} showFav={false} />
      </View>
    );

    const showPhotoFullScreen = (
      <View style={[styles.fillView, styles.fullScreenWrapper]}>
        <IconMCI
          name="close"
          size={25}
          color={colors.notQuiteBlack}
          onPress={() => {
            this.setState({...this.state, fullScreenPhoto: false});
            this.props.navigation.setParams({
              headerLeft: (
                <HeaderBackButton
                  onPress={() => this.props.navigation.goBack(null)}
                  tintColor={colors.contrast}
                  title={strings.back}
                  backTitleVisible={true}
                />
              ),
              headerStyle: {
                backgroundColor: colors.primary,
              },
            });
          }}
          style={styles.fullScreenClose}
        />
        <Image
          source={{uri: this.props.selectedDog.key}}
          style={styles.fillView}
          resizeMode="contain"
        />
      </View>
    );

    return (
      <KeyboardAvoidingView style={styles.fillView} behavior="position" enabled>
        <SafeAreaView
          style={[
            styles.parent,
            {
              backgroundColor: this.state.fullScreenPhoto
                ? colors.black
                : colors.white,
            },
          ]}
          contentContainerStyle="justifyContent">
          {/* show full screen photo if required */}
          {this.state.fullScreenPhoto && showPhotoFullScreen}
          {/* photos */}
          <Swiper
            showsButtons={true}
            activeDotColor={colors.notQuiteWhite}
            nextButton={
              <Text style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: 70}}>
                ›
              </Text>
            }
            prevButton={
              <Text style={{color: 'rgba(255, 255, 255, 0.5)', fontSize: 70}}>
                ‹
              </Text>
            }>
            {/* if this were a real app there would be an array of photos to iterate over. 
          Instead the single photo is used five times just to demonstrate the swiper feature */}
            {photos}
            {photos}
            {photos}
            {photos}
            {photos}
          </Swiper>
          {/* favorite icon */}
          <Animatable.View
            ref={strings.refs.bounceRef}
            style={styles.animatable}>
            <TouchableWithoutFeedback
              style={styles.fillView}
              onPress={() => {
                this.handleFavorite();
              }}>
              {/* icon by Smash Icons */}
              <Image source={this.getFavoriteIcon()} style={styles.fillView} />
            </TouchableWithoutFeedback>
          </Animatable.View>
          {/* quick details */}
          {quickDetailsTopRow}
          {quickDetailsBottomRow}
          <ScrollView style={styles.scrollView} ref={strings.refs.scrollRef}>
            {/* seller details */}
            {sellerDetails}
            {/* description */}
            <Text style={styles.description}>
              {this.props.selectedDog.description}
            </Text>
            {/* map */}
            <Map location={this.props.selectedDog.location} />
            {/* message container */}
            {messageWrapper}
            {/* recently viewed */}
            {/* only show if there are recent dogs in the array. The currently selected dog does not count. */}
            {this.props.recentlyViewed.length > 0 &&
            this.props.recentlyViewed.length === 1
              ? //there may be one dog in the recents but if it's the same as currently selected then don't show recents
                this.props.recentlyViewed[0] !== this.props.selectedDog &&
                recents
              : recents}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    selectedDog: state.selectedDog,
    signedIn: state.signedIn,
    recentlyViewed: state.recentlyViewed,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToFavorites: dog => {
      dispatch(addToFavorites(dog));
    },
    removeFromFavorites: dog => {
      dispatch(removeFromFavorites(dog));
    },
    addToRecents: dog => {
      dispatch(addToRecents(dog));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogProfile);
