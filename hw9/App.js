import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import store from './redux/store';
import BadgerPreferencesContext from './contexts/BadgerPreferencesContext';
import BadgerTabs from './components/navigation/BadgerTabs';
import { Provider } from 'react-redux'

export default function App() {

  const [prefs, setPrefs] = useState({});

  return (
    <Provider store={store}>
      <BadgerPreferencesContext.Provider value={[prefs, setPrefs]}>
        <NavigationContainer>
          <BadgerTabs />
        </NavigationContainer>
      </BadgerPreferencesContext.Provider>
      <StatusBar style="auto" />
    </Provider>
  );
}