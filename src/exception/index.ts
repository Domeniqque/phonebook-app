import { Alert, DevSettings } from 'react-native';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import crashlytics from '@react-native-firebase/crashlytics';

const errorHandler = (e: Error, isFatal: boolean): void => {
  if (isFatal) {
    crashlytics().recordError(e);

    Alert.alert(
      'Unexpected error occurred ',
      'We will need to restart the app.',
      [
        {
          text: 'Restart',
          onPress: () => {
            DevSettings.reload();
          },
        },
      ],
    );
  } else {
    console.log(e);
  }
};

setJSExceptionHandler(errorHandler);

setNativeExceptionHandler(
  (errorString: string): void => {
    crashlytics().recordError(new Error(errorString));
  },
  true,
  true,
);
