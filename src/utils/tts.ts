import Tts from 'react-native-tts';

export const initializeTTS = () => {
  Tts.setDefaultLanguage('en-US');
  Tts.setDefaultRate(0.5);
  Tts.setDefaultPitch(1.0);
  Tts.addEventListener('tts-start', (event) => console.log('start', event));
  Tts.addEventListener('tts-finish', (event) => console.log('finish', event));
  Tts.addEventListener('tts-cancel', (event) => console.log('cancel', event));
};