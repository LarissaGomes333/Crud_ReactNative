import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserScreen = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          phone,
        });
      });
      setUsers(users);
    });
  }, []);

  return (
    <ScrollView>
      {/* <View style={Styles.botao}>
        <Button
          onPress={() => props.navigation.navigate("CreateUserScreen")}
          title="Create User"
          color={"#03A678"}
        />
      </View> */}
      {users.map((user) => {
        return (
          <ListItem          
          containerStyle={{backgroundColor:"white"}}
          titleStyle={{backgroundColor:'#F24405'}}
          
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserDetailScreen", {
                userId: user.id,
              });
            }}
          >
            <ListItem.Chevron/>
            <Avatar
              source={{
                uri:
                "data:image/jpeg;base64,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"
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title style={{color:"black"}}>{user.name}</ListItem.Title>
              {/* <ListItem.Subtitle>{user.email}</ListItem.Subtitle> */}
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
 
});


export default UserScreen;
