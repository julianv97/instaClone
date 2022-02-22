import React, {useState, useRef} from 'react';
import {View, TouchableWithoutFeedback, Image, Button} from 'react-native';
import {RNCamera, TakePictureOptions} from 'react-native-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import styles from './styles';

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const pickerOptions: Action = {
  title: 'Select Image or Video\n(mixed)',
  type: 'library',
  options: {
    // Con selectionLimit se puede setear cuantas fotos elegir, si pongo 0 puedo elegir cualquier cantidad
    selectionLimit: 1,
    mediaType: 'mixed',
  },
};

const AddPost: React.FC = () => {
  const camRef = useRef<any>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [image, setSimage] = useState<string | undefined>(undefined);

  const imagePickerHandler = async () => {
    const result = await launchImageLibrary(pickerOptions?.options);
    // Si selecciono mas de una imágen, assets es un array con las imágenes seleccionadas
    // Como selecciono solo una, assets es un array con una sola posición
    if (result.assets?.length) {
      setSimage(result.assets[0].uri);
    }
  };

  const onTakePhotoHandler = async () => {
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
        <TouchableWithoutFeedback onPress={onTakePhotoHandler}>
          <View style={styles.button} />
        </TouchableWithoutFeedback>
      </RNCamera>
      {image && <Image source={{uri: image}} style={styles.image} />}
      <Button title="Pick from your gallery" onPress={imagePickerHandler} />
    </View>
  );
};

export default AddPost;
