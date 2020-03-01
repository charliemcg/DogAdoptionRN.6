import store from "../store";
import { setResults, setExactMatches } from "../actions";

//get dogs filtered by search results
export function getDogs() {
  const filters = store.getState().searchFilters;
  const breed = filters.breed;
  const location = filters.location;
  const priceMin = filters.priceMin;
  const priceMax = filters.priceMax;
  //no filters selected. Show all dogs
  if (
    breed === null &&
    location === null &&
    priceMin === null &&
    priceMax === null
  ) {
    store.dispatch(setResults(store.getState().allDogs));
    store.dispatch(setExactMatches(0));
    //apply filters
  } else {
    const unfilteredDogsArr = [...store.getState().allDogs];
    let exactMatchesArr = [];
    let oneDegreeFromExactArr = [];
    let twoDegreesFromExactArr = [];
    for (let i = 0; i < unfilteredDogsArr.length; i++) {
      const dog = unfilteredDogsArr[i];
      //count how many filters match the current dog
      let count = 0;
      //check if breed matches
      dog.breed === breed && count++;
      breed === null && count++;
      //check if location matches
      dog.location === location && count++;
      location === null && count++;
      //increment for a positive result when checking the min and max price each
      let priceChecks = 0;
      //checking minimum price
      priceMin === "Free"
        ? //all free dogs immediately pass the low pass threshold
          priceChecks++
        : //no need to check min price if user hasn't specified one
        priceMin === null
        ? priceChecks++
        : //checking dog's price is above minimum
          Number(dog.price.replace("$", "")) >= priceMin && priceChecks++;
      //checking maximum price
      priceMax === "Free"
        ? //only free dogs qualify
          dog.price === "Free" && priceChecks++
        : //no need to check max price if user hasn't specified one
        priceMax === null
        ? priceChecks++
        : // checking dog's price is below maximum
          Number(dog.price.replace("$", "") <= priceMax) && priceChecks++;
      //two positive price checks means the dog's price is within the filter range
      priceChecks === 2 && count++;
      switch (count) {
        case 3:
          exactMatchesArr.push(unfilteredDogsArr[i]);
          break;
        case 2:
          oneDegreeFromExactArr.push(unfilteredDogsArr[i]);
          break;
        case 1:
          twoDegreesFromExactArr.push(unfilteredDogsArr[i]);
          break;
      }
    }
    //create array of dogs ordered from best match to worst match
    const orderedByMatchArr = exactMatchesArr
      .concat(oneDegreeFromExactArr)
      .concat(twoDegreesFromExactArr);
    store.dispatch(setResults(orderedByMatchArr));
    store.dispatch(setExactMatches(exactMatchesArr.length));
  }
}
