import React, { useEffect, useState } from 'react'
import { 
  StyleSheet,
  Text,
  View,
// Button,
  TextInput,
  SearchBar,
} from 'react-native';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function App() {

  const [isSearching, setSearching] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [value, setValue] = useState("")
  const handleClick = (value) => {
    setValue("");
  }
  const handleChange=(event) => {
    setValue(event.target.value);
  }

  const databaseURL = 'http://localhost:5000/weather/'
  const locationId = databaseURL + value

  const getLocations = async () => {
    try {
      const response = await fetch(locationId)
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
          <Button style={{backgroundColor:awesomeRed, borderColor:awesomeRed}}>Menu</Button>
          <Text style={styles.logo}>
            Spicy Forecast
          </Text>
          {isSearching ? 
            <InputGroup style={{width: 300}}>
              <Button style={styles.button} onClick={()=> setSearching(false)}>X</Button>
              <Form.Control
                style={styles.searchBar}
                placeholder="Search"
                onChange={handleChange}
                value={value}
              />
              <Button style={styles.button} onClick={handleClick}>Clear</Button>
            </InputGroup>
          : (
            <Button style={{backgroundColor:awesomeRed, borderColor:awesomeRed}} onClick={()=> setSearching(true)}>Search</Button>
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
    width: 'auto',
  },

  button: {
    backgroundColor: awesomeRed,
    borderWidth: 1,
    width: 'auto',
  },

});
