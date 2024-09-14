import HorizontalCard from "@/components/HorizontalCard";
import { Decks } from "@/constants/Decks";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [duration, setDuration] = useState(3 * 60);
  const [deckTitle, setDeckTitle] = useState("");
  const [shouldStartGame, setShouldStartGame] = useState(false);

  const formatDuration = (duration: number) => {
    const minutes = duration < 60 ? 0 : Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    return `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
  };

  const onDeckClick = (deckTitle: string) => {
    setDeckTitle(deckTitle);
    setModalVisible(true);
  };

  const startGame = () => {
    setShouldStartGame(true);
    setModalVisible(false);
  };

  useEffect(() => {
    return () => {
      setModalVisible(false);
    };
  }, []);

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
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onDismiss={() => {
          if (shouldStartGame && deckTitle.length > 0) {
            router.push(`/game/${deckTitle}?duration=${duration}`);
          }
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Set game duration</Text>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <TouchableOpacity
                disabled={duration <= 30}
                style={[styles.button]}
                onPress={() =>
                  duration <= 30 ? null : setDuration(duration - 30)
                }
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: 20,
                    color: duration <= 30 ? "#d1d5db" : "black",
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "500",
                  paddingHorizontal: 10,
                  alignSelf: "center",
                }}
              >
                {formatDuration(duration)}
              </Text>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => setDuration(duration + 30)}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: 20,
                    color: "black",
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.button,
                  styles.buttonClose,
                  { marginHorizontal: 10, backgroundColor: "#475569" },
                ]}
                onPress={() => {
                  setShouldStartGame(false);
                  setModalVisible(false);
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.button,
                  styles.buttonClose,
                  { marginHorizontal: 10 },
                ]}
                onPress={() => startGame()}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

  centeredView: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#334155aa",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 20,
  },
  modalText: {
    fontWeight: "500",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default Home;
