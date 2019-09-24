import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Picker } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import MapView from 'react-native-maps';

const { Marker } = MapView;

const { height, width } = Dimensions.get('screen');
const parkings = [
  {
    id: 1,
    title: 'Parking 1',
    price: 5,
    rating: 4.5,
    spots: 20,
    free: 10,
    coordinate: {
      latitude: 37.78735,
      longitude: -122.4334,
    }
  },
  {
    id: 2,
    title: 'Parking 2',
    price: 7,
    rating: 3.8,
    spots: 25,
    free: 20,
    coordinate: {
      latitude: 37.78895,
      longitude: -122.4344,
    }
  },
  {
    id: 3,
    title: 'Parking 3',
    price: 18,
    rating: 4.9,
    spots: 50,
    free: 2,
    coordinate: {
      latitude: 37.78555,
      longitude: -122.4354,
    }
  },
];

export default class Map extends Component {

  state = {
    hours: {},
    active: null,
  }

  componentDidMount() {
    const hours = {};

    parkings.map(parking => {
      hours[parking.id] = 1;
    });

    this.setState({ hours });
  }

  renderHeader() {
    return (
      <View style={ styles.header }>
      <Text>Header</Text>
    </View>
    );
  }

  renderParking(item) {
    const { hours } = this.state;

    return (
      <TouchableWithoutFeedback key={`parking-${item.id}`} onPress={() => this.setState({ active: item.id })}>
        <View style={[ styles.parking, styles.shadow ]}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 14 }}>X {item.spots} {item.title}</Text>
            <View style={{ width: 100, borderRadius: 5, borderColor: 'grey', borderWidth: 0.5, marginTop: 10 }}>
              <Picker
                selectedValue={this.state.hours[item.id || 1]}
                style={{ height: 30, width: 110 }}
                onValueChange={(itemValue, itemIndex) => 
                  this.setState({ hours: { ...this.state.hours, [item.id]: itemValue} })
              }>
                <Picker.Item label='01:00' value={1} />
                <Picker.Item label='02:00' value={2} />
                <Picker.Item label='03:00' value={3} />
                <Picker.Item label='04:00' value={4} />
                <Picker.Item label='05:00' value={5} />
                <Picker.Item label='06:00' value={6} />
              </Picker>
              {/* <Text style={{ fontSize: 16 }}>>05:00</Text> */}
            </View>
          </View>
          <View style={{ flex: 1.7, flexDirection: 'row' }}>
            <View style={{ flex: 0.5, justifyContent: 'center', marginHorizontal: 24 }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Ionicons name='ios-pricetag' size={16} color='#7D81BA' />
                <Text style={{ paddingLeft: 6 }}>${item.price}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Ionicons name='ios-star' size={16} color='#7D81BA' />
                <Text style={{ paddingLeft: 6 }}>${item.rating}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.buy}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 18, color: 'white' }}>${item.price * 2}</Text>
                <Text style={{ fontSize: 12, color: 'white' }}>${item.price}x{hours[item.id]} hrs</Text>
              </View>
              <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: 'white' }}>></Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderParkings() {
    return (
      <ScrollView 
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment='center'
        style={styles.parkings}
      >
        {parkings.map(parking => this.renderParking(parking))}
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
      {this.renderHeader()}
        <MapView 
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          }}
          style={ styles.map }
        >
         { parkings.map(parking => (
           <Marker 
            key={`marker-${parking.id}`}
            coordinate={ parking.coordinate }
           >
             <View style={[ styles.marker, styles.shadow, this.state.active === parking.id ? styles.active : null ]}>
              <Text style={{ color: '#840B15', fontWeight: 'bold' }}>${parking.price}</Text>
              <Text style={{ color: '#7D81BA' }}> ({ parking.free })/{parking.spots}</Text>
             </View>
           </Marker>
         )) }
        </MapView>
        {this.renderParkings()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  map: {
    flex: 3,
  },
  parkings: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: 24,
  },
  parking: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    marginHorizontal: 24,
    width: width - (24 * 2),
  },
  buy: {
    flex: 1,
    flexDirection: 'row',
    padding: 6,
    backgroundColor: '#D25260',
    borderRadius: 6,
  },
  marker: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 6 
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    
    elevation: 3,
  },
  active: {
    borderColor: '#840B15',
    borderWidth: 0.5,
  }
});
