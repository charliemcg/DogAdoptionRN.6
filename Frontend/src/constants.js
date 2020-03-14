export default {
  api: {
    breedsList: 'https://dog.ceo/api/breeds/list/all',
    allDogs: 'https://dog.ceo/api/breeds/image/random/50',
    imagesStart: 'https://dog.ceo/api/breed/',
    imagesEnd: '/images',
  },
  actions: {
    setAllDogs: 'SET_ALL_DOGS',
    selectedDog: 'SELECTED_DOG',
    breedsList: 'BREEDS_LIST',
    setSearchFilters: 'SET_SEARCH_FILTERS',
    setResults: 'SET_RESULTS',
    signInOut: 'SIGN_IN_OUT',
    addToFavorites: 'ADD_TO_FAVORITES',
    removeFromFavorites: 'REMOVE_FROM_FAVORITES',
    addToRecents: 'ADD_TO_RECENTS',
    setExactMatches: 'SET_EXACT_MATCHES',
    toggleError: 'TOGGLE_ERROR',
  },
  states: ['WA', 'NT', 'SA', 'QLD', 'NSW', 'ACT', 'VIC', 'TAS'],
};
