import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

export const Search = ({ navigation, item }) => {
  const [film, setFilm] = React.useState([]);
  const [values, setValues] = React.useState("");

  const films = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${values}`)
      .then((res) => res.json())
      .then((data) => setFilm(data))
      .catch((err) => console.log(err));
  };

  return (
    <View>
      <Text style={styles.title}>Search Movie And Serie</Text>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={(text) => setValues(text)}
        value={values}
      />
      <View style={styles.button}>
        <Button color="#fff" title="Submit" onPress={films}></Button>
      </View>
      <FlatList
        initialNumToRender={10}
        data={film}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate("Details", { item })}
            >
              <View style={styles.flatList}>
                <Image
                  style={styles.img}
                  source={
                    item.show.image
                      ? { uri: item.show.image.original }
                      : require("../img/imgNotFound.png")
                  }
                />
                <Text style={styles.name}>{item.show.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
    textAlign: "center",
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
    top: -20,
  },
  img: {
    resizeMode: "contain",
    width: 400,
    height: 400,
  },
  name: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  flatList: {
    paddingTop: 300,
    top: -300,
    justifycontent: "center",
    alignItems: "center",
  },
});
