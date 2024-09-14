import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  icon: string;
  title: string;
  bgColor: string;
  textColor: string;
  onPress: () => void;
};

const HorizontalCard = ({
  icon,
  title,
  textColor,
  bgColor,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, { backgroundColor: bgColor }]}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    paddingVertical: 20,
    margin: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: "500",
    color: "white",
  },
  icon: {
    fontSize: 30,
  },
});

export default HorizontalCard;
