// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC0UOtcgCMfERY4yH_A9ES20E0rEhkc7y8',
    authDomain: 'udemy-material-fitness-tracker.firebaseapp.com',
    databaseURL: 'https://udemy-material-fitness-tracker.firebaseio.com',
    projectId: 'udemy-material-fitness-tracker',
    storageBucket: 'udemy-material-fitness-tracker.appspot.com',
    messagingSenderId: '1091019687987'
  }
};
