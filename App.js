import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.container}>
        <Text>Lets get spicy!</Text>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const Header = () => {
  return (
    <View>
      <Text>
        Spicy Forecast
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#b40240',
  },

  container: {
    flex: 1,
    backgroundColor: '#b40240',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },

  header: {
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },

});
