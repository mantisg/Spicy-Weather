import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, SearchBar } from 'react-native';

export default function App() {

  const [isSearching, setSearching] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getLocations = async () => {
    try {
      const response = await fetch('http://localhost:5000/locations')
      const json = await response.json()
      setData(json.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getLocations()
  }, [])

  return (
    <View>
    {isLoading ? <Text>loading...</Text> : (
      <View style={styles.container}>
        <View style={styles.headBand}>
          <Button title='Menu' color={awesomeRed} />
          <Text style={styles.logo}>
            Spicy Forecast
          </Text>
          {isSearching ? <TextInput
            style={styles.searchBar}
            placeholder="Search"
          /> : (
            <Button title="Search" color={awesomeRed} onPress={() => setSearching(true)} />
          )}
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
        {data.map((i, k) => <Text key={k}>{i}</Text>)}
      </View>
     )}
    </View>
  )
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
    backgroundColor: awesomeRed,
  },

  searchBar: {
    borderWidth: 1,
    padding: 5,
    color: awesomeRed,
  },

});
