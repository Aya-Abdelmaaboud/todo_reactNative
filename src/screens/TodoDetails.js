import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../shared/styles';

export default function TodoDetails() {
  const {item}=useRoute().params;

  return (
    <>
      <View style={styles.container}>
        <Text>title: {item.title}</Text>
        <Text>description: {item.description}</Text>
      </View>
    </>
  )
}
