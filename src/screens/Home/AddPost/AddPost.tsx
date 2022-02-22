import React, {useState, useRef} from 'react';
import {View, TouchableWithoutFeedback, Image, Button} from 'react-native';
import {RNCamera, TakePictureOptions} from 'react-native-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from './styles';

const pickerOptions = {
  title: 'Select Image',
  customButtons: [
    {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const AddPost: React.FC = () => {
  const camRef = useRef<any>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [image, setSimage] = useState<string | undefined>(undefined);

  const buttonPress = async () => {
    const result = await launchImageLibrary(pickerOptions?.storageOptions);
    setSimage(result?.assets[0]?.uri);
  };

  const onPressHandler = async () => {
    if (camRef && !isCapturing) {
      setIsCapturing(true);
      const options: TakePictureOptions = {
        quality: 1,
        base64: true,
        width: 2000,
      };
      const data = await camRef.current.takePictureAsync(options);
      setSimage(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera ref={camRef} style={styles.preview} captureAudio={false}>
        <TouchableWithoutFeedback onPress={onPressHandler}>
          <View style={styles.button} />
        </TouchableWithoutFeedback>
      </RNCamera>
      {image && <Image source={{uri: image}} style={styles.image} />}
      <Button title="Pick from your gallery" onPress={buttonPress} />
    </View>
  );
};

export default AddPost;
