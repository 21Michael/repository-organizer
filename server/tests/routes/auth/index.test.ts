import CurrentUserTest from './auth.currentUser.test'
import GitHubAuthTest from './auth.GitHub.test'
import signInTest from './auth.signIn.test'
import signOutTest from './auth.signOut.test'
import signUpTest from './auth.signUp.test'

export default describe("ROUTERS AUTH: ", () => {
    CurrentUserTest
    GitHubAuthTest
    signInTest
    signOutTest
    signUpTest
});

