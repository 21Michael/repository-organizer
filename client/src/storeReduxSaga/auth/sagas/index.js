import sagaWatchCurrentUser from "./sagaCurrentUser.js";
import sagaWatchSignInUser from "./sagaSignInUser.js";
import sagaWatchSignOutUser from "./sagaSignOutUser.js";
import sagaWatchSignUpUser from "./sagaSignUpUser.js";

const sagas = [
  sagaWatchCurrentUser(),
  sagaWatchSignInUser(),
  sagaWatchSignOutUser(),
  sagaWatchSignUpUser(),
];

export default sagas;
