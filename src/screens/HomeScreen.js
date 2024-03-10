import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SectionList,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {responsiveSize} from '../utils/responsiveSize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchData} from '../utils/api';
import {useNavigation} from '@react-navigation/native';
import AppDrawer from '../components/Drawer';

const Tab = createBottomTabNavigator();

function Movies() {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    fetchData('movie', 'upcoming', 1).then(data =>
      setMoviesData(prevData => [
        ...prevData,
        {title: 'Upcoming', data: data.data},
      ]),
    );
    fetchData('movie', 'top_rated', 1).then(data =>
      setMoviesData(prevData => [
        ...prevData,
        {title: 'Top Rated', data: data.data},
      ]),
    );
    fetchData('movie', 'popular', 1).then(data =>
      setMoviesData(prevData => [
        ...prevData,
        {title: 'Popular', data: data.data},
      ]),
    );
  }, []);

  return (
    <AppDrawer style={styles.container}>
      <SectionList
        style={{flex: 1, flexGrow: 1}}
        sections={moviesData}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <></>}
        renderSectionHeader={({section: {title, data}}) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
              style={{flexGrow: 1}}
              horizontal
              data={data}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => <Card item={item} />}
            />
          </View>
        )}
      />
    </AppDrawer>
  );
}

function Series() {
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    fetchData('tv', 'airing_today', 1).then(data =>
      setSeriesData(prevData => [
        ...prevData,
        {title: 'Airing Today', data: data.data},
      ]),
    );
    fetchData('tv', 'top_rated', 1).then(data =>
      setSeriesData(prevData => [
        ...prevData,
        {title: 'Top Rated', data: data.data},
      ]),
    );
    fetchData('tv', 'popular', 1).then(data =>
      setSeriesData(prevData => [
        ...prevData,
        {title: 'Popular', data: data.data},
      ]),
    );
  }, []);

  return (
    <AppDrawer style={styles.container}>
      <SectionList
        style={{flex: 1, flexGrow: 1}}
        sections={seriesData}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <></>}
        renderSectionHeader={({section: {title, data}}) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
              style={{flexGrow: 1}}
              horizontal
              data={data}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => <Card item={item} />}
            />
          </View>
        )}
      />
    </AppDrawer>
  );
}

// Individual Card
const Card = ({item}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('DetailsScreen', {item: item});
      }}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#cfcfcf' : 'white',
        },
        styles.card,
      ]}>
      <Image
        source={{uri: 'https://image.tmdb.org/t/p/w92' + item.image}}
        style={{width: responsiveSize(65), height: responsiveSize(100)}}
      />
      <View
        style={{
          paddingHorizontal: responsiveSize(2),
          marginTop: responsiveSize(2),
        }}>
        <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons
            name="star"
            color="#FDD835"
            size={responsiveSize(10)}
          />
          <Text>
            {item.stars} ({item.ratings})
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const HomeScreen = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          size = responsiveSize(20);
          color = focused ? 'blue' : 'black';

          let iconName;
          if (route.name === 'Movies') {
            iconName = 'movie-outline';
          } else if (route.name === 'Series') {
            iconName = 'television';
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarLabel: ({focused, color}) => {
          return (
            <Text style={{fontSize: responsiveSize(8), color: color}}>
              {route.name}
            </Text>
          );
        },
        tabBarStyle: styles.tabBar,
      })}>
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Series" component={Series} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: responsiveSize(40),
    paddingBottom: responsiveSize(3),
  },
  sectionTitle: {
    color: 'black',
    fontSize: responsiveSize(16),
    fontWeight: 'bold',
    marginVertical: responsiveSize(10),
  },
  section: {marginHorizontal: responsiveSize(10)},
  card: {
    width: responsiveSize(65),
    height: responsiveSize(130),
    marginHorizontal: responsiveSize(5),
  },
  itemTitle: {
    fontSize: responsiveSize(8),
    fontWeight: '500',
    color: 'black',
  },
});

export default HomeScreen;
