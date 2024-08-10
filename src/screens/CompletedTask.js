import React, { useEffect } from "react";
import { ImageBackground, Text, View } from "react-native";
import { styles } from "../shared/styles";
import * as ScreenOrientation from "expo-screen-orientation";

const image = { uri: "https://legacy.reactjs.org/logo-og.png" };
export default function CompletedTask() {
  useEffect(() => {
    changeOrientationToDefault = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.DEFAULT
      );
    };
    changeOrientationToDefault();
  });
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.textImage}>completed task</Text>
      </ImageBackground>
    </View>
  );
}
