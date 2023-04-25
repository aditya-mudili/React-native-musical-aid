import {AppRegistry} from 'react-native';
// import { View } from 'react-native/Libraries/Components/View/View';
import OnboardingScreen from './components/Onboarding';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
AppRegistry.registerComponent(appName, ()=> App);

TrackPlayer.registerPlaybackService(() => require('./service'));