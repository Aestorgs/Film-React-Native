import React from "react";
import MaterialIcons from "react-native-vector-icons/Feather";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Search } from "./pages/Search";
import { users } from "./AppContext";
import { tokens } from "./AppContext";
import { Details } from "./pages/Details";
import { Favoris } from "./pages/Favoris";
import { Setting } from "./pages/Setting";
import { Profil } from "./pages/Profil";
import { UpdateProfil } from "./pages/UpdateProfil";

export default function App() {
  const [user, setUser] = React.useState();
  const [token, setToken] = React.useState();
  const Stack = createNativeStackNavigator();
  return (
    <users.Provider value={{ user, setUser }}>
      <tokens.Provider value={{ token, setToken }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
              name="Search"
              component={Search}
              options={({ navigation }) => ({
                headerRight: () => (
                  <MaterialIcons
                    name="settings"
                    size={30}
                    onPress={() => navigation.navigate("Setting", {})}
                  />
                ),
              })}
            />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Favoris" component={Favoris} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Profil" component={Profil} />
            <Stack.Screen name="UpdateProfil" component={UpdateProfil} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </tokens.Provider>
    </users.Provider>
  );
}
