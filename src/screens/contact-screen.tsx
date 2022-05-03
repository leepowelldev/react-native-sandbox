import React, {
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { StateContext } from '../state-context';

interface SetNameValueAction {
  type: 'SET_NAME_VALUE';
  payload: string;
}

interface SetAgeValueAction {
  type: 'SET_AGE_VALUE';
  payload: string;
}

interface SetAddressValueAction {
  type: 'SET_ADDRESS_VALUE';
  payload: string;
}

interface ResetValuesAction {
  type: 'RESET_VALUES';
}

type Actions =
  | SetNameValueAction
  | SetAgeValueAction
  | SetAddressValueAction
  | ResetValuesAction;

interface State {
  nameValue: string;
  addressValue: string;
  ageValue: string;
}

const initialState: State = {
  nameValue: '',
  addressValue: '',
  ageValue: '',
};

function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case 'SET_NAME_VALUE': {
      return { ...state, nameValue: action.payload };
    }
    case 'SET_ADDRESS_VALUE': {
      return { ...state, addressValue: action.payload };
    }
    case 'SET_AGE_VALUE': {
      return { ...state, ageValue: action.payload };
    }
    case 'RESET_VALUES': {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}

function setNameValueAction(
  payload: string,
  dispatch: Dispatch<SetNameValueAction>
) {
  dispatch({ type: 'SET_NAME_VALUE', payload });
}

function setAgeValueAction(
  payload: string,
  dispatch: Dispatch<SetAgeValueAction>
) {
  dispatch({ type: 'SET_AGE_VALUE', payload });
}

function setAddressValueAction(
  payload: string,
  dispatch: Dispatch<SetAddressValueAction>
) {
  dispatch({ type: 'SET_ADDRESS_VALUE', payload });
}

function resetValuesAction(dispatch: Dispatch<ResetValuesAction>) {
  dispatch({ type: 'RESET_VALUES' });
}

function useContactScreenState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { nameValue, addressValue, ageValue } = state;

  const setNameValue = useCallback((value: string) => {
    setNameValueAction(value, dispatch);
  }, []);

  const setAgeValue = useCallback((value: string) => {
    setAgeValueAction(value, dispatch);
  }, []);

  const setAddressValue = useCallback((value: string) => {
    setAddressValueAction(value, dispatch);
  }, []);

  const resetValues = useCallback(() => {
    resetValuesAction(dispatch);
  }, []);

  return {
    nameValue,
    addressValue,
    ageValue,
    setNameValue,
    setAgeValue,
    setAddressValue,
    resetValues,
  };
}

interface ContactScreenProps {
  navigation: NavigationProp<{}>;
}

function ContactScreen({ navigation }: ContactScreenProps) {
  const [key, setKey] = useState(1);
  const [count, setCount] = useContext(StateContext);

  useEffect(() => {
    console.log('contact', count);
  }, [count]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () =>
      setKey((k) => k + 1)
    );
    return unsubscribe;
  }, [navigation]);

  function handleSubmit() {
    navigation.navigate('Thanks');
  }

  return (
    <>
      <ContactScreenForm onSubmit={handleSubmit} key={key} />
      <Button title="Update State" onPress={() => setCount((c) => c + 1)} />
    </>
  );
}

interface ContactScreenFormProps {
  onSubmit: () => void;
}

function ContactScreenForm({ onSubmit }: ContactScreenFormProps) {
  const {
    nameValue,
    addressValue,
    ageValue,
    setNameValue,
    setAddressValue,
    setAgeValue,
    // resetValues,
  } = useContactScreenState();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     const currentlyFocusedInput = TextInput.State.currentlyFocusedInput();
  //     if (currentlyFocusedInput) {
  //       currentlyFocusedInput.blur();
  //     }
  //     setTimeout(resetValues, 0);
  //   });

  //   return unsubscribe;
  // }, [navigation, resetValues]);

  return (
    <View>
      <Text>Name:</Text>
      <TextInput
        value={nameValue}
        onChangeText={setNameValue}
        style={styles.input}
      />
      <Text>Address:</Text>
      <TextInput
        value={addressValue}
        onChangeText={setAddressValue}
        style={styles.input}
      />
      <Text>Age:</Text>
      <TextInput
        value={ageValue}
        onChangeText={setAgeValue}
        style={styles.input}
      />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
});

export { ContactScreen };
