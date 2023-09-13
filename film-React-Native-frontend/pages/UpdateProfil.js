import React from "react";
import { View, TextInput, StyleSheet, Text, Button } from "react-native";
import { tokens } from "../AppContext";

export const UpdateProfil = ({ navigation }) => {
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const { token } = React.useContext(tokens);

  
    const handleSubmit = async () => {
      try {
        const res = await fetch("http://localhost:3000/users", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
          }),
        });
  
        if (res.status === 200) {
          navigation.navigate("Home");
        } else {
          res.status === 400 && setMessage("Some error occured");
        }
      } catch (error) {
        console.log("ERREUR", error);
      }
    };
  return (
    <View>
      <Text style={styles.title}>Update Compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Firstname"
        onChangeText={(text) => setFirstname(text)}
        value={firstname}
      />

      <TextInput
        style={styles.input}
        placeholder="Lastname"
        onChangeText={(text) => setLastname(text)}
        value={lastname}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={styles.button}>
        <Button onPress={handleSubmit} color="#fff" title="Update Profil"></Button>
      </View>
      <View>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    fontSize: 15,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    padding: 20,
    textAlign: "center",
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
