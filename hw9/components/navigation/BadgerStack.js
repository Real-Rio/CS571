import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailedNews from '../DetailedNews';
import NewsFeed from '../screens/NewsFeed';

const Stack = createNativeStackNavigator();


function BadgerStack(props) {
    return <Stack.Navigator>
        <Stack.Screen name="Feeds" component={NewsFeed} options={{headerShown:false}} />
        <Stack.Screen name="NewsDetail" component={DetailedNews} />
    </Stack.Navigator>
}

export default BadgerStack;