import React from 'react';
import {Text} from 'react-native';

function DetailsScreen({route}) {
  const {item} = route.params;
  return <Text>{JSON.stringify(item)}</Text>;
}

export default DetailsScreen;
