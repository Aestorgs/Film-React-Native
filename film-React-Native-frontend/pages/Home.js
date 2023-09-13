import React from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import { tokens, users } from "../AppContext";

export const Home = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { setUser } = React.useContext(users);
  const { setToken } = React.useContext(tokens);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setUser(data.users);
        setToken(data.token);
        navigation.navigate("Search");
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (error) {
      console.log("ERREUR", error);
    }
  };

  const Register = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.top}>
      <Text style={styles.title}>Welcome To Movie</Text>
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
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        value={password}
      />
      <View style={styles.button}>
        <Button onPress={handleSubmit} color="#fff" title="Login"></Button>
      </View>

      <View style={styles.buttonTop}>
        <Button
          onPress={() => Register()}
          color="#fff"
          title="Register"
        ></Button>
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
  top: {
    marginTop: 110,
  },
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
  message: {
    fontSize: 20,
    padding: 20,
    textAlign: "center",
    color: "red",
  },
});
