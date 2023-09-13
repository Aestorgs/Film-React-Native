import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/AntDesign";
import { tokens } from "../AppContext";

export const Favoris = () => {
  const [message, setMessage] = React.useState("");
  const [data, setData] = React.useState([]);
  const { token } = React.useContext(tokens);

  React.useEffect(() => {
    fetch(`http://localhost:3000/users/favoris/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(async (shows) => {
        const show = await Promise.all(
          shows.favoris.map((fav) => {
            return fetch(
              `https://api.tvmaze.com/shows/${fav.showsId}?embed=cast`
            )
              .then((res) => res.json())
              .then((data) => [data, fav.id])
              .catch((err) => console.log(err));
          })
        );
        setData(show);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRemove = async (itemId) => {
    try {
      const res = await fetch(`http://localhost:3000/favoris/shows/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        // Mise à jour de la liste data après la suppression
        setData((prevData) => {
          const newData = prevData.filter((item) => item[1] !== itemId);
          return newData;
        });

        // Afficher le message de suppression réussie
        setMessage("The movie has been successfully deleted.");
      } else {
        setMessage("An error has occurred");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(a) => a[0].id}
      renderItem={({ item }) => {
        const show = item[0];
        return (
          <View>
            <Image
              style={styles.img}
              source={
                show.image
                  ? { uri: show.image.original }
                  : require("../img/imgNotFound.png")
              }
            />
            <Text style={styles.titre}>{show.name}</Text>
            <MaterialIcons
              onPress={() => handleRemove(item[1])}
              style={{ marginLeft: 180 }}
              name="heart"
              size={30}
            ></MaterialIcons>
            <View>
              {message ? <Text style={styles.message}>{message}</Text> : null}
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  img: {
    marginTop: 20,
    display: "flex",
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
  message: {
    fontSize: 20,
    padding: 20,
    textAlign: "center",
    color: "red",
  },
});
