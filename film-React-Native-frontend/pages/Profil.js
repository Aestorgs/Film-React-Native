import React from "react";
import { View, StyleSheet, Text , Button } from "react-native";
import { tokens } from "../AppContext";

export const Profil = ({ navigation }) => {
  const [data, setData] = React.useState({});
  const [message, setMessage] = React.useState("");
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

  const handleRemove = async () => {
    try {
      const res = await fetch(`http://localhost:3000/users`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setMessage("The account is successfully deleted");
        navigation.navigate("Home");
      } else {
        setMessage("An error has occurred");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  const UpdateProfil = () => {
    navigation.navigate("UpdateProfil");
  };

  return (
    <View style={styles.top}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.firstname}>Firstname : {data.firstname}</Text>
      <Text style={styles.lastname}>Lastname : {data.lastname}</Text>
      <Text style={styles.email}>Email : {data.email}</Text>
      <View style={styles.button}>
        <Button onPress={() => UpdateProfil()} color="#fff" title="Update Profil the profil "></Button>
      </View>
      <View style={styles.button}>
        <Button onPress={() => handleRemove()} color="#fff" title="Delete the profil "></Button>
      </View>
      <View>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    padding: 20,
    textAlign: "center",
  },
  firstname: {
    fontSize: 25,
    padding: 25,
  },
  lastname: {
    fontSize: 25,
    padding: 25,
  },
  email: {
    fontSize: 25,
    padding: 25,
  },
  button: {
    margin: 35,
    fontSize: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  message: {
    fontSize: 20,
    padding: 20,
    textAlign: "center",
    color: "red",
  },
});
