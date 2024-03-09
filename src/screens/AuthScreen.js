import React, {useEffect, useState} from 'react';
import {responsiveSize} from '../utils/responsiveSize';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  ToastAndroid,
} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

const AuthScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1004360783573-8bu9obm9ihfdsmhnm86p5vbv8sd1d54a.apps.googleusercontent.com',
    });
    isSignedIn();
  }, []);

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const uInfo = await GoogleSignin.getCurrentUser();
      if (uInfo) {
        setUserInfo(uInfo);
      } else {
        try {
          uInfo = await GoogleSignin.signInSilently();
          setUserInfo(uInfo);
        } catch (e) {
          // console.log(e);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      navigation.navigate('HomeScreen');
    }
  }, [userInfo]);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const uInfo = await GoogleSignin.signIn();
      setUserInfo(uInfo);
      ToastAndroid.show('Login Successful!', ToastAndroid.SHORT);
      // console.log(uInfo);
    } catch (e) {
      // console.log(e);
      ToastAndroid.show('Login Failed!', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        {/* If loading show activity indicator else show sign button */}
        {isLoading ? (
          <ActivityIndicator
            style={styles.buttonContainer}
            size="large"
            color="#0000ff"
          />
        ) : (
          <GoogleSigninButton
            style={styles.btn}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={signIn}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: responsiveSize(162),
    height: responsiveSize(30),
  },
  buttonContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: responsiveSize(140),
    height: responsiveSize(35),
  },
});

export default AuthScreen;
