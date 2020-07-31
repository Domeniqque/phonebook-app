import { NativeModules } from 'react-native';

const { PlatformConstants } = NativeModules;
const deviceType = PlatformConstants.interfaceIdiom;

const isMobilePhone = deviceType !== 'pad';

export default isMobilePhone;
