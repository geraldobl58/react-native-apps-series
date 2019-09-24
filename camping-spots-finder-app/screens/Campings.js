import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  ImageBackground
} from 'react-native';

import MapView from 'react-native-maps';
import { Ionicons, FontAwesome, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

export default class Campings extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    active: 'all',
  }

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={{ flex: 2, flexDirection: 'row' }}>
            <View style={styles.settings}>
              <View style={styles.location}>
                <FontAwesome name="location-arrow" size={14} color="white" />
              </View>
            </View>
            <View style={styles.options}>
              <Text style={{ fontSize: 12, color: 'gray', marginBottom: 5 }}>Localização Atual</Text>
              <Text style={{ fontSize: 14, fontWeight: '300' }}>Serra da Mantiqueira</Text>
            </View>
          </View>
          <View style={styles.settings}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
              <Ionicons name="ios-settings" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {this.renderTabs()}
      </View>
    );
  }

  renderMap() {
    return (
      <View style={styles.map}>
        <MapView 
          style={{ flex: 1, height: height * 0.5, width }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }

  renderTabs() {
    const { active } = this.state;

    return (
      <View style={styles.tabs}>
        <View style={[ styles.tab, active === 'all' ? styles.activeTab : null ]}>
          <Text style={[ styles.tabTitle, active === 'all' ? styles.activeTabTitle : null ]} onPress={() => this.setState({ active: 'all' })}>Todos Locais</Text>
        </View>
        <View style={[ styles.tab, active === 'tent' ? styles.activeTab : null ]}>
          <Text style={[ styles.tabTitle, active === 'tent' ? styles.activeTabTitle : null ]} onPress={() => this.setState({ active: 'tent' })}>Barracas</Text>
        </View>
        <View style={[ styles.tab, active === 'rv' ? styles.activeTab : null ]}>
          <Text style={[ styles.tabTitle, active === 'rv' ? styles.activeTabTitle : null ]} onPress={() => this.setState({ active: 'rv' })}>Acampamento</Text>
        </View>
      </View>
    );
  }

  renderList() {
    const campings = [
      {
        id: 1,
        name: 'Fazenda das Pedras',
        description: 'A cidade de Itu fica a 1 hora de São Paulo e possui ótimos passeios para fazer entre amigos, casais ou até mesmo em família.',
        ratting: 4.9,
        distance: 2.9,
        price: '59',
        image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=130'
      },
      {
        id: 2,
        name: 'Parque Vale das Pedras',
        description: 'A cidade de Socorro é conhecida como um destino de aventura bem próximo a São Paulo. São diversas atividades, trilhas e lugares.',
        ratting: 4.7,
        distance: 3.4,
        price: '39',
        image: 'https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=130'
      },
      {
        id: 3,
        name: 'Camping do Saltão',
        description: 'A cidade de Brotas é um destino de ecoturismo em São Paulo e possui diversas atividades para amantes da natureza, como visita a cachoeiras e trilhas.',
        ratting: 4.2,
        distance: 8.4,
        price: '45',
        image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=130'
      }
    ];

    return campings.map(
      camping => {
        return (
          <View  key={`camping-${camping.id}`} style={styles.camping}>
          <ImageBackground 
              style={styles.campingImage} 
              imageStyle={styles.campingImage}
              source={{ uri: camping.image }}
            />
            <View style={styles.campingDetails}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', justifyContent: 'center' }}>
                {camping.name}
              </Text>
              <Text style={{ fontSize: 12, color: '#A5A5A5', paddingTop: 5 }}>
                {camping.description}
              </Text>
            </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.campingInfo}>
                  <FontAwesome name="star" color="#FFBA5A" size={12} />
                  <Text style={{ marginLeft: 4, color: '#FFBA5A' }}>{camping.ratting}</Text>
                </View>
                <View style={styles.campingInfo}>
                  <FontAwesome name="location-arrow" color="#FF7657" size={12} />
                  <Text style={{ marginLeft: 4, color: '#FF7657' }}>{camping.distance}km</Text>
                </View>
                <View style={styles.campingInfo}>
                  <Ionicons name="md-pricetag" color="black" size={12} />
                  <Text style={{ marginLeft: 4, color: 'black' }}>R${camping.price}</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.2, justifyContent: 'center' }}>
              <SimpleLineIcons name="options-vertical" color="#A5A5A5" size={24} />
            </View>
          </View>  
        );
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          {this.renderHeader()}
        <ScrollView style={styles.container}>
          {this.renderMap()}
          {this.renderList()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.15,
    paddingHorizontal: 14,
  },
  headerContainer: {
    top: 0,
    height: height * 0.15,
    width: width,
    marginTop: 20,
  },
  location: {
    height: 24,
    width: 24,
    backgroundColor: '#FF7657',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  settings: {
    alignItems: "center",
    justifyContent: 'center',
  },
  options: {
    flex: 1,
    paddingHorizontal: 14,
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // height: height * 0.05,
  },
  tab: {
    paddingHorizontal: 14,
    marginHorizontal: 10,
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 16,
  },
  activeTab: {
    borderBottomColor: '#FF7657', 
    borderBottomWidth: 3,
  },
  activeTabTitle: {
    color: '#FF7657', 
  },
  map: {
    flex: 1,
  },
  camping: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#A5A5A5',
    borderBottomWidth: 0.6,
    padding: 20,
  },
  campingDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  campingInfo: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  campingImage: {
    width: width * 0.30,
    height: width * 0.25,
    borderRadius: 14,
  }
});
