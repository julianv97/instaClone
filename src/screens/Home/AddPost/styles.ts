import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 72,
    height: 72,
    borderRadius: 72 / 2,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 92,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
  spacing: {
    position: 'absolute',
    bottom: 140,
  },
  title: {
    position: 'absolute',
    top: 100,
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    position: 'absolute',
    top: 5,
    left: 21,
    zIndex: 100,
  },
  image: {
    flex: 1,
  },
});

export default styles;
