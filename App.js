import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headBand}>
        <Text>Icon</Text>
        <Text style={styles.logo}>
          Spicy Forecast
        </Text>
        <Text>Search</Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.mainText}>
          Lets get spicy!
        </Text>
      </View>

      <View style={styles.tempElement}>
        <Text>
          Temperature Display
        </Text>
      </View>
    </View>
  );
}

const awesomeRed = '#b40240'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: awesomeRed,
    alignItems: 'center',
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  mainText: {
    fontWeight: 'bold',
    fontSize: '20px',
  },

  headBand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eeeeee',
    width: '100%',
  },

  logo: {
    fontFamily: '',
    fontWeight: 'bold',
    fontSize: '50px',
  },

  tempElement: {
    flexDirection: 'row',
    backgroundColor: awesomeRed
  },

});
