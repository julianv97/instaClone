import React, {useState, useRef} from 'react';
import {View, TouchableWithoutFeedback, Image} from 'react-native';
import {RNCamera, TakePictureOptions} from 'react-native-camera';
import styles from './styles';

const AddPost: React.FC = () => {
  const camRef = useRef<any>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [image, setSimage] = useState(null);

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
      {image && (
        <Image
          source={{uri: image}}
          style={{
            flex: 1,
          }}
        />
      )}
    </View>
  );
};

export default AddPost;
