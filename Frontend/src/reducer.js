import constants from './constants';

//default state
function getPlaceholderData() {
  return {
    //all dogs in system
    allDogs: [],
    //the dog which the user is currently looking at
    selectedDog: {
      key: null,
      location: null,
      price: null,
      breed: null,
      description: null,
      date: null,
    },
    //all the different types of breeds
    breeds: [],
    //the filters chosen by the user for filtering the results
    searchFilters: {
      breed: null,
      location: null,
      priceMin: null,
      priceMax: null,
    },
    //all the dogs in the system accounting for user selected filters
    searchResults: null,
    //inform user how many exact matches there are after applying filters
    exactMatches: 0,
    //is user signed in
    signedIn: false,
    //details of signed in user
    user: {
      first_name: null,
      last_name: null,
      username: null,
      location: null,
      password: null,
    },
    //dogs selected as favorites by the user
    favorites: [],
    //recently viewed dogs
    recentlyViewed: [],
    //there was an error with getting data
    error: false,
  };
}

const reducer = (state = getPlaceholderData(), action) => {
  switch (action.type) {
    //all dogs in the system
    case constants.actions.setAllDogs:
      let moreDogsArr = [...action.payload];
      let concatenatedArr = moreDogsArr.concat([...state.allDogs]);
      state = {
        ...state,
        allDogs: concatenatedArr,
      };
      break;
    //the dog which the user is currently viewing
    case constants.actions.selectedDog:
      state = {
        ...state,
        selectedDog: action.payload,
      };
      break;
    //the list of breeds
    case constants.actions.breedsList:
      state = {
        ...state,
        breeds: action.payload,
      };
      break;
    //the search filters
    case constants.actions.setSearchFilters:
      state = {
        ...state,
        searchFilters: action.payload,
      };
      break;
    //the search results
    case constants.actions.setResults:
      state = {
        ...state,
        searchResults: action.payload,
      };
      break;
    //the exact matches
    case constants.actions.setExactMatches:
      state = {
        ...state,
        exactMatches: action.payload,
      };
      break;
    //toggle user as either signed in or out
    case constants.actions.signInOut:
      state = {
        ...state,
        signedIn: !state.signedIn,
      };
      break;
    //setting the signed in user
    case constants.actions.setUser:
      state = {
        ...state,
        user: action.payload,
      };
      break;
    //adding new dog to favorites
    case constants.actions.addToFavorites:
      let newArr = [...state.favorites];
      newArr.unshift(action.payload);
      state = {
        ...state,
        favorites: newArr,
      };
      break;
    //removing dog from favorites
    case constants.actions.removeFromFavorites:
      const index = state.favorites.indexOf(action.payload);
      let removeFavoriteArr = [...state.favorites];
      removeFavoriteArr.splice(index, 1);
      state = {
        ...state,
        favorites: removeFavoriteArr,
      };
      break;
    //adding recently viewed dogs
    case constants.actions.addToRecents:
      let newRecents = [...state.recentlyViewed];
      newRecents.unshift(action.payload);
      newRecents.length > 10 && newRecents.pop();
      state = {
        ...state,
        recentlyViewed: newRecents,
      };
      break;
    //is there an error with retrieving data
    case constants.actions.toggleError:
      state = {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
  return state;
};

export default reducer;
