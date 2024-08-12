import HorizontalCard from "@/components/HorizontalCard";
import { Decks } from "@/constants/Decks";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";

const Home = () => {
  const onDeckClick = (deckTitle: string) => {
    router.push(`/game/${deckTitle}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.titleText}>Choose a category</Text>
        }
        style={styles.list}
        data={Decks}
        renderItem={({ item }) => (
          <HorizontalCard
            onPress={() => {
              onDeckClick(item.title);
            }}
            textColor={item.textColor}
            icon={item.icon}
            title={item.title}
            bgColor={item.bgColor}
          />
        )}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: "100%",
    backgroundColor: "#fafafa",
  },
  titleText: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "500",
    marginVertical: 20,
  },
  list: {
    display: "flex",
    // backgroundColor: "black",
    width: "100%",
  },
});

export default Home;
