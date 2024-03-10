import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {responsiveSize} from '../utils/responsiveSize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fetchDetails} from '../utils/api';

function DetailsScreen({route}) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchDetails(route.params.item.type, route.params.item.id).then(data =>
      setItem(data),
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        {!item ? (
          <ActivityIndicator
            style={styles.buttonContainer}
            size="large"
            color="#0000ff"
          />
        ) : (
          <>
            <Image
              source={{uri: 'https://image.tmdb.org/t/p/original' + item.image}}
              style={{width: responsiveSize(215), height: responsiveSize(320)}}
            />
            <View style={styles.detailView}>
              <Text style={styles.title}>{item.title}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: responsiveSize(5),
                }}>
                <MaterialIcons
                  name="star"
                  color="#FDD835"
                  size={responsiveSize(10)}
                />
                <Text style={{color: 'black'}}>
                  {item.stars} ({item.ratings})
                </Text>
              </View>
              <Text style={{fontSize: responsiveSize(9)}}>{item.genres}</Text>
              <Text style={{fontSize: responsiveSize(9)}}>{item.date}</Text>
              <Text style={styles.subTitle}>Overview</Text>
              <Text style={styles.overviewText}>{item.overview}</Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailView: {
    backgroundColor: 'white',
    padding: responsiveSize(5),
  },
  title: {
    fontSize: responsiveSize(17),
    fontWeight: 'bold',
    color: 'black',
  },
  ratingView: {
    flexDirection: 'row',
  },
  subTitle: {
    fontSize: responsiveSize(13),
    fontWeight: 'bold',
    color: 'black',
    marginVertical: responsiveSize(5),
  },
  overviewText: {
    fontSize: responsiveSize(9),
    textAlign: 'justify',
    color: 'black',
  },
});

export default DetailsScreen;
