import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  DrawerLayoutAndroid,
  ToastAndroid,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

const CustomDrawerContent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={() => signOut(navigation)} />
    </View>
  );
};

signOut = async navigation => {
  try {
    await GoogleSignin.signOut();
    ToastAndroid.show('Logout Successful!', ToastAndroid.SHORT);
    navigation.navigate('AuthScreen');
  } catch (error) {
    console.error(error);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppDrawer = ({children}) => {
  let drawerRef = React.createRef();

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={200}
      drawerPosition={'right'}
      renderNavigationView={() => <CustomDrawerContent />}>
      {children}
    </DrawerLayoutAndroid>
  );
};

export default AppDrawer;
