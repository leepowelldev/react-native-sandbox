import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC, useState } from 'react';
import { StatusBar, StyleSheet, Text, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedHeaderScreen } from './screens/animated-header-screen';
import { ContactScreen } from './screens/contact-screen';
import { ThanksScreen } from './screens/thanks-screen';
import { StateContext } from './state-context';

const { Navigator, Screen } = createNativeStackNavigator();

const App: FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [count, setCount] = useState(0);
  const backgroundColor = isDarkMode ? 'black' : 'white';

  return (
    <SafeAreaProvider>
      <StateContext.Provider value={[count, setCount]}>
        <SafeAreaView style={[{ backgroundColor }, styles.container]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <Navigator initialRouteName="AnimatedHeader">
              <Screen
                name="AnimatedHeader"
                component={AnimatedHeaderScreen}
                options={{ headerShown: false }}
              />
              <Screen
                name="Contact"
                component={ContactScreen}
                getId={({ params }) => params?.id}
                initialParams={{ id: 1 }}
              />
              <Screen name="Thanks" component={ThanksScreen} />
            </Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </StateContext.Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { App };
