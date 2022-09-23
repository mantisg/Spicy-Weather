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
  const [hasSubmittedSearch, setHasSubmittedSearch] = useState(false)
  const [isInMenu, setMenu] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [locations, setLocations] = useState([])
  const [searchText, setSearchText] = useState("")
  const [searchResult, setSearchResult] = useState([])

  // const weatherPath = (searchText) => {
  //   return `http://localhost:5000/weather/${searchText}`
  // };

  const displaySearchResult = words => {
    return words.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }

  const handleSearchClose = () => {
    setSearchText("")
    setHasSubmittedSearch(false)
  }

  const handleSubmit = event => {
    event.preventDefault();
    setHasSubmittedSearch(true)
    setSearchResult(locations.filter(l => l.toLowerCase() === searchText.toLowerCase().replace(' ', '-')))
  };

  const getLocations = async () => {
    try {
      const response = await fetch("http://localhost:5000/locations")
      const json = await response.json()
      setLocations(json.data)
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
    {isLoading ? <Text style={styles.loading}>loading...</Text> : (
      <View style={styles.container}>
        <View style={styles.headBand}>
          {isInMenu ? <Text>Oh Shit</Text> : 
            <Button style={styles.mainButtons} onClick={() => setMenu(true)}>Menu</Button>
          }
          <Text style={styles.logo}>
            Spicy Forecast
          </Text>
          {!isSearching ? <Button style={styles.mainButtons} onClick={()=> setSearching(true)}>Search</Button> :
            (<Form onSubmit={handleSubmit}>
              <InputGroup style={{width: 300}}>
                <Button style={styles.button} onClick={()=> setSearching(false)}>X</Button>
                <Form.Control
                  style={styles.searchBar}
                  placeholder="Search"
                  onChange={({ target }) => setSearchText(target.value)}
                  value={searchText}
                />
                <Button style={styles.button} onClick={handleSearchClose}>Clear</Button>
              </InputGroup>
              {!hasSubmittedSearch ? <></> : <Form.Select>
                {searchResult.length === 0 ? <option>No Locations Found</option> : (
                  searchResult.map((l, key) => <option value={l}>{displaySearchResult(l)}</option>)
                )}
              </Form.Select>}
            </Form>
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
          {filterLocations.map(({data}) => (
              <Text>{data}</Text>
            ))}
        </View>
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

  mainButtons: {
    backgroundColor: awesomeRed,
    borderColor: awesomeRed,
  },

  button: {
    backgroundColor: awesomeRed,
    borderWidth: 1,
    width: 'auto',
  },

  loading: {
    color: awesomeRed,
    fontSize: 50,
    textAlign: 'center',
  },

  tempDisplay: {
    alignItems: 'center',
    justifyContent: 'center',
  },

});
