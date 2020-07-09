// import { Alert } from 'react-native';
// import RNRestart from 'react-native-restart';
// import crashlytics from '@react-native-firebase/crashlytics';
// import RNExitApp from 'react-native-exit-app';
// import {
//   setJSExceptionHandler,
//   setNativeExceptionHandler,
// } from 'react-native-exception-handler';

// import { getLocale } from '../locale';

// let lang = 'en_US';

// getLocale().then(result => {
//   lang = result.language;
// });

// setJSExceptionHandler((e: Error, isFatal: boolean): void => {
//   crashlytics().recordError(e);

//   if (isFatal) {
//     Alert.alert(
//       lang === 'pt_BR'
//         ? 'Um erro inesperado \naconteceu 😢'
//         : 'Unexpected error \noccurred 😢',
//       `
//         ${isFatal ? 'Fatal error' : 'Error'}: ${e.name} ${e.message}
//         ${
//           lang === 'pt_BR'
//             ? 'Nós já avisamos nosso time! Por favor, feche \no app e inicie novamente!'
//             : 'We have reported this to our team. Please close \nthe app and start again!'
//         }
//       `,
//       [
//         {
//           text: lang === 'pt_BR' ? 'Fechar' : 'Close',
//           onPress: () => RNExitApp.exitApp(),
//         },
//         {
//           text: lang === 'pt_BR' ? 'Reiniciar' : 'Restart',
//           onPress: () => RNRestart.Restart(),
//         },
//       ],
//     );
//   } else {
//     console.log('Error handler: ', e);
//   }
// }, true);

// setNativeExceptionHandler(
//   (exceptionString: string): void => {
//     crashlytics().recordError(new Error(exceptionString));
//   },
//   true,
//   true,
// );
