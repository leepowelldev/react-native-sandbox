import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { StateContext } from '../state-context';

function ThanksScreen({ navigation }: { navigation: NavigationProp<{}> }) {
  const [count, setCount] = useContext(StateContext);

  useEffect(() => {
    console.log('thanks', count);
  }, [count]);

  useFocusEffect(
    useCallback(() => {
      console.log('focus effect');
      return () => {
        console.log('unfocus effect');
      };
    }, [])
  );

  return (
    <View>
      <Text>Thanks</Text>
      <Button
        title="Contact"
        onPress={() =>
          navigation.navigate({ name: 'Contact', params: { id: 2 } })
        }
      />
      <Button title="Update State" onPress={() => setCount((c) => c + 1)} />
    </View>
  );
}

export { ThanksScreen };
