import React  from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const AppStack = createStackNavigator()

import Casos from './pages/casos'
import Detalhes from './pages/detalhes'

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions ={{headerShown: false}}>
                <AppStack.Screen name='casos' component ={Casos}/>

                <AppStack.Screen name='detalhes' component ={Detalhes}/>  
            </AppStack.Navigator>
        </NavigationContainer>

    )

}