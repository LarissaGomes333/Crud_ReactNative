import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const userRef = firebase.db.collection("users").doc(user.id);
    await userRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
      curso: user.curso,
    });
    setUser(initialState);
    props.navigation.navigate("UsersList");
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{color: "#253659", fontSize:20}}>
        <Text
          placeholder="Name"
          autoCompleteType="username"
          // style={styles.inputGroup}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />Nome: {user.name}
      </View>
      <View style={{color: "#253659", fontSize:20}}> 
        <Text
          // autoCompleteType="email"
          placeholder="Email"
          // style={styles.inputGroup}
          // value={user.email}
          // onChangeText={(value) => handleTextChange(value, "email")}
        />Email: {user.email}
      </View>
      <View style={{color: "#253659", fontSize:20}}>
        <Text
          // placeholder="Phone"
          // autoCompleteType="tel"
          // value={user.phone}
          // onChangeText={(value) => handleTextChange(value, "phone")}
        />Telefone: {user.phone}
      </View>
      <View style={{color: "#253659", fontSize:20}}>
        <Text
          // placeholder="Phone"
          // autoCompleteType="tel"
          // style={styles.inputGroup}
          // value={user.phone}
          // onChangeText={(value) => handleTextChange(value, "phone")}
        />Curso: {user.curso}
      </View>
      {/* <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View> */}
      {/* <View>
        <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default UserDetailScreen;
