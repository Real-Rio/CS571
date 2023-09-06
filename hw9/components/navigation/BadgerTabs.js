import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen"
import BadgerStack from "./BadgerStack";

const Tab = createBottomTabNavigator();

function BadgerTabs(props) {
    return <Tab.Navigator>
        <Tab.Screen name="News" component={BadgerStack} options={{ headerShown: false }} />
        <Tab.Screen name="Preferences" component={BadgerPreferencesScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
}

export default BadgerTabs;