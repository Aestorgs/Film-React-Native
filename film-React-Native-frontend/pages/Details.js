import React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/AntDesign";
import { tokens, users } from "../AppContext";

export const Details = ({ route }) => {
  const { item } = route.params;
  const [detail, setDetail] = React.useState({});
  const [message, setMessage] = React.useState("");
  const { user } = React.useContext(users);
  const { token } = React.useContext(tokens);

  React.useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${item.show.id}?embed=cast`)
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const shows = async () => {
    try {
      const res = await fetch("http://localhost:3000/favoris/shows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          showsId: item.show.id,
          users: user,
        }),
      });
      if (res.status === 201) {
        setMessage("The movie or serie has been added ");
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  const sanitizedSummary = detail.summary
    ? detail.summary.replace(/<\/?p>|<\/?b>/g, "")
    : "";

  return (
    <ScrollView>
      <Image
        style={styles.img}
        source={
          detail.image
            ? { uri: detail.image?.medium || detail.image?.original }
            : require("../img/imgNotFound.png")
        }
      />
      <Text style={styles.titre}> Titre : {detail.name}</Text>
      <MaterialIcons
        onPress={() => shows()}
        style={{ marginLeft: 180 }}
        name="hearto"
        size={30}
      ></MaterialIcons>
      <View>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
      {<Text style={styles.notes}> Notes : {detail.rating?.average} / 10</Text>}
      {<Text style={styles.genres}> Types : {detail.genres}</Text>}
      {<Text style={styles.p}>{sanitizedSummary}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    marginTop: 10,
    resizeMode: "contain",
    width: 400,
    height: 400,
  },
  titre: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  notes: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },
  genres: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },
  p: {
    fontSize: 20,
    padding: 20,
    fontWeight: "normal",
  },
  message: {
    fontSize: 20,
    padding: 20,
    textAlign: "center",
    color: "green",
  },
});
