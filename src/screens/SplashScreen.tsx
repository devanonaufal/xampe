import * as React from "react";
import {FlatList} from "react-native";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {Button, StyleService, useStyleSheet} from "@ui-kitten/components";
import {Container, Text} from "components";
import {RootStackParamList} from "navigation/navigation-types";

interface SplashButtonProps {
  name: string;
  navigate?: keyof RootStackParamList;
}

const SplashScreen = React.memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);

  const data: SplashButtonProps[] = [
    { name: "Onboarding" },
    { name: "Authenticate" },
    { name: "Authentication", navigate: "Authentication" },
    { name: "Social Media" },
    { name: "Profile" },
    { name: "Finance", navigate: "Finance" },
    { name: "Food Delivery" },
    { name: "ECommerce" },
    { name: "Reading" },
    { name: "Fitness" },
    { name: "Health" },
    { name: "Crypto" },
    { name: "Menu" },
    { name: "Home", navigate: "Home" },
    { name: "Exam", navigate: "Exam" },
  ];

  return (
    <Container style={styles.container}>
      <Text category="h3" center marginBottom={32}>
        {`Welcome to\nTramKam UIkit 🎉🎉🎉`}
      </Text>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => {
          return (
            <Button
              children={item.name}
              style={styles.button}
              disabled={!item.navigate}
              onPress={() => {
                item.navigate && navigate(item.navigate);
              }}
            />
          );
        }}
      />
    </Container>
  );
});

export default SplashScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  button: {
    marginBottom: 24,
    flex: 1,
    marginHorizontal: 8,
    maxWidth: "45%",
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 40,
    paddingTop: 24,
  },
});
