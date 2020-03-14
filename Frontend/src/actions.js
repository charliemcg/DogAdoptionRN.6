import constants from './constants';

export function setAllDogs(results) {
  return {
    type: constants.actions.setAllDogs,
    payload: results,
  };
}

export function selectedDog(dog) {
  return {
    type: constants.actions.selectedDog,
    payload: dog,
  };
}

export function breedsList(breeds) {
  return {
    type: constants.actions.breedsList,
    payload: breeds,
  };
}

export function setSearchFilters(filters) {
  return {
    type: constants.actions.setSearchFilters,
    payload: filters,
  };
}

export function setResults(results) {
  return {
    type: constants.actions.setResults,
    payload: results,
  };
}

export function setExactMatches(results) {
  return {
    type: constants.actions.setExactMatches,
    payload: results,
  };
}

export function signInOut() {
  return {
    type: constants.actions.signInOut,
  };
}

export function addToFavorites(dog) {
  return {
    type: constants.actions.addToFavorites,
    payload: dog,
  };
}

export function removeFromFavorites(dog) {
  return {
    type: constants.actions.removeFromFavorites,
    payload: dog,
  };
}

export function addToRecents(dog) {
  return {
    type: constants.actions.addToRecents,
    payload: dog,
  };
}

export function toggleError(err) {
  return {
    type: constants.actions.toggleError,
    payload: err,
  };
}
