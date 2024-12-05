// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

// Iitialize connection for Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

// Import the screens
import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';

import { useNetInfo }from '@react-native-community/netinfo';
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  // Define a state for the network connectivity status
  const connectionStatus = useNetInfo();

  // Display a warning message if the connection is lost, otherwise, enable the network
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyBM3wUtp2R1ncBGsqZC3eZoJjMwm2VGr9s",
    authDomain: "shopping-list-demo-66412.firebaseapp.com",
    projectId: "shopping-list-demo-66412",
    storageBucket: "shopping-list-demo-66412.firebasestorage.app",
    messagingSenderId: "741231738101",
    appId: "1:741231738101:web:443682902afb23e88519bc"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
      >
        <Stack.Screen 
          name="Welcome" 
          component={Welcome} 
        />
        <Stack.Screen
          name="ShoppingLists"
        >
         {props => <ShoppingLists isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;