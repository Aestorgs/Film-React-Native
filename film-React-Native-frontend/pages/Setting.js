import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { tokens } from "../AppContext";

export const Setting = ({ navigation }) => {
  const [data, setData] = React.useState({});
  const { token } = React.useContext(tokens);
  React.useEffect(() => {
    fetch(`http://localhost:3000/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Favoris = () => {
    navigation.navigate("Favoris");
  };

  const Profil = () => {
    navigation.navigate("Profil");
  };
  return (
    <View style={styles.top}>
      <Text style={styles.title}>
        {data.firstname} {data.lastname}
      </Text>
      <View style={styles.button}>
        <Button onPress={() => Profil()} color="#fff" title="Profil"></Button>
      </View>
      <View style={styles.buttonTop}>
        <Button onPress={() => Favoris()} color="#fff" title="Favoris"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 35,
    fontSize: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  title: {
    fontSize: 35,
    padding: 20,
    textAlign: "center",
  },
  buttonTop: {
    margin: 35,
    fontSize: 10,
    top: -40,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});
