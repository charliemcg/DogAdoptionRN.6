import store from '../store';
import constants from '../constants';
import {setAllDogs, toggleError} from '../actions';
import {getDogs} from './searchAlgorithm';

export function loadAllDogsInSystem() {
  //Use this to get hard coded data from the Django backend
  // this.useDjangoApi();
  //Use this to get results from the third party Dog api
  this.useThirdPartyApi();
}

useDjangoApi = () => {
  let imgArr = [];
  fetch(
    //get all dogs of all breeds
    constants.api.djangoTestApi,
  )
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        imgArr.push({
          key: String(data[i]['id']),
          location: data[i]['location'],
          price: data[i]['price'],
          breed: data[i]['breed'],
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae ultricies dolor. Aenean lacus nisi, viverra consequat consequat nec, pulvinar nec magna. Donec ac augue turpis. Curabitur vel sem nec arcu fermentum sollicitudin nec vitae ex. Proin tempus, orci nec facilisis dapibus, dolor velit efficitur purus, quis hendrerit ipsum nulla quis augue. Ut condimentum, nisi et hendrerit sagittis, libero enim dignissim sapien, in laoreet elit eros ut arcu. Phasellus venenatis elit in risus eleifend, a mollis justo bibendum. Fusce neque enim, lacinia eget neque vel, egestas blandit ante. Vestibulum rutrum ipsum nisi, in imperdiet mauris ultrices vitae. Morbi ultricies leo vitae purus varius, vel euismod nisi finibus. In et semper orci, ut dignissim lorem. Maecenas vitae consectetur augue. Vivamus condimentum a ipsum ut efficitur. Cras non mauris vitae nulla pellentesque volutpat. Quisque vitae nibh maximus, maximus sem vitae, hendrerit nisi.',
          date: this.generateTimestamp(),
          user: data[i]['user'],
        });
      }
      store.dispatch(setAllDogs(imgArr));
      getDogs();
    })
    .catch(e => store.dispatch(toggleError(true)));
};

useThirdPartyApi = () => {
  let imgArr = [];
  fetch(
    //get all dogs of all breeds
    constants.api.allDogs,
  )
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      for (let i = 0; i < data.message.length; i++) {
        let trimmedString = '';
        // need to extract breed from the image url
        //removing the head
        trimmedString = String(data.message[i]).replace(
          constants.api.allImages,
          '',
        );
        //removing the tail
        let tailString = trimmedString.substring(trimmedString.indexOf('/'));
        trimmedString = trimmedString.replace(tailString, '');
        //simplifying more complicated breed types
        let subBreedIndex = trimmedString.indexOf('-');
        let subTailString = trimmedString.substring(subBreedIndex);
        if (subBreedIndex > 0) {
          trimmedString = trimmedString.replace(subTailString, '');
        }
        //capitalizing the breed
        trimmedString =
          trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1);
        imgArr.push({
          key: String(data.message[i]),
          location: constants.states[Math.floor(Math.random() * 8)],
          price: this.generatePrice(),
          breed: trimmedString,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae ultricies dolor. Aenean lacus nisi, viverra consequat consequat nec, pulvinar nec magna. Donec ac augue turpis. Curabitur vel sem nec arcu fermentum sollicitudin nec vitae ex. Proin tempus, orci nec facilisis dapibus, dolor velit efficitur purus, quis hendrerit ipsum nulla quis augue. Ut condimentum, nisi et hendrerit sagittis, libero enim dignissim sapien, in laoreet elit eros ut arcu. Phasellus venenatis elit in risus eleifend, a mollis justo bibendum. Fusce neque enim, lacinia eget neque vel, egestas blandit ante. Vestibulum rutrum ipsum nisi, in imperdiet mauris ultrices vitae. Morbi ultricies leo vitae purus varius, vel euismod nisi finibus. In et semper orci, ut dignissim lorem. Maecenas vitae consectetur augue. Vivamus condimentum a ipsum ut efficitur. Cras non mauris vitae nulla pellentesque volutpat. Quisque vitae nibh maximus, maximus sem vitae, hendrerit nisi.',
          date: this.generateTimestamp(),
          user: this.generateUser(),
        });
      }
      store.dispatch(setAllDogs(imgArr));
      getDogs();
    })
    .catch(e => store.dispatch(toggleError(true)));
};

//generating placeholder prices. Not to be used in production
generatePrice = () => {
  // Getting a price between 0 and 2000 rounded up to the nearest 100
  // prettier-ignore
  let price = Math.ceil(Math.floor((Math.random() * 2000) + 1) / 100) * 100;

  // some dogs should be free
  // prettier-ignore
  if (Math.floor(Math.random() * 6) === 0) {
      return "Free";
    }

  return `$${price}`;
};

//getting a random date within the last few weeks
generateTimestamp = () => {
  return (
    new Date().getTime() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 21)
  );
};

generateUser = () => {
  const user1 = {
    first_name: 'Test',
    last_name: 'User1',
    username: 'Dummy1',
    location: 'QLD',
    password: 'Dummy1',
  };
  const user2 = {
    first_name: 'Test',
    last_name: 'User2',
    username: 'Dummy2',
    location: 'QLD',
    password: 'Dummy2',
  };
  return Math.floor(Math.random() * 2) === 0 ? user1 : user2;
};
