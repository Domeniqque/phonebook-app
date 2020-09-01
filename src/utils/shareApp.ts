import crashlytics from '@react-native-firebase/crashlytics';
import Share from 'react-native-share';

export const shareApp = async (text = 'Phone Preaching'): Promise<void> => {
  crashlytics().log('Click on share app button');

  const android =
    'https://play.google.com/store/apps/details?id=com.appphonebook';
  const ios = 'https://apps.apple.com/app/id1524566605';

  try {
    await Share.open({
      message: `${text}\n\n Android\n${android}\n\n iOS\n${ios}`,
      failOnCancel: false,
    });
  } catch (err) {
    const error = err instanceof Error ? err : new Error(err);
    crashlytics().recordError(error);
  }
};
