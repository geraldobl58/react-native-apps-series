import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native'
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons';
import { CircularProgress } from 'react-native-circular-progress';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Block, Badge, Card, Text } from '../components';
import { theme, mocks, mapStyles } from '../constants';
import { styles as blockStyles } from '../components/Block';
const { width } = Dimensions.get('window');

export default class Trip extends Component {
  static navigationOptions = ({ navigation }) => {
    const showMap = navigation.getParam('map');

    return {
      headerTitle: (
        <Text style={theme.fonts.header}>
          Trajeto Atual
        </Text>
      ),
      headerLeft: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Trip', { map: !showMap })}>
          <Text 
            medium 
            accent={showMap} 
            primary={!showMap}
            transform="uppercase"
          >
            {showMap ? 'Fechar Mapa' : 'Mostrar Mapa'}
          </Text>
        </TouchableOpacity>
      )
    }
  }

  renderChart() {
    return (
      <Card 
        style={{
          paddingVertical: theme.sizes.base * 2,
          shadowColor: theme.colors.black,
          shadowOpacity: 0.11,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 13,
          elevation: 5, // for android
        }}
      >
        <Block center>
          <CircularProgress
            size={214}
            fill={85}
            lineCap="round"
            rotation={220}
            arcSweepAngle={280}
            width={theme.sizes.base}
            tintColor={theme.colors.primary}
            backgroundColor={theme.colors.gray3}
            backgroundWidth={theme.sizes.base / 2}
          >
            {() => (
              <Block center middle>
                <Text h2 medium>8.1</Text>
                <Text h3 tranform="uppercase">Bom</Text>
              </Block>
            )}
          </CircularProgress>
        </Block>

        <Block center>
          <Text title spacing={1} style={{ marginVertical: 8 }}>Pontuação Atual</Text>
          <Text>
            <Text gray tranform="uppsercase">Desafio</Text>
            <Text primary> 37</Text>
          </Text>
        </Block>

      </Card>
    );
  }

  renderMap() {
    return (
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <MapView
          region={mocks.location}
          provider={PROVIDER_GOOGLE}
          customMapStyle={[mapStyles]}
          style={styles.map}
        >
          <Marker
            rotation={25}
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={{ latitude: -23.5686879, longitude: -46.647775 }}
          >
            <Badge color={rgba(theme.colors.primary, '0.2')} size={77}>
              <TouchableOpacity activeOpacity={0.8}>
                <Badge color={rgba(theme.colors.primary, '0.2')} size={57}>
                  <Icon.MaterialCommunityIcons name="car-sports" size={57 / 2.5} color="black" />
                </Badge>
              </TouchableOpacity>
            </Badge>
          </Marker>
        </MapView>
        <TouchableOpacity 
          activeOpacity={0.8} 
          style={[styles.mapMyLocation, blockStyles.shadow]}
          onPress={() => Alert.alert('Localização Atual', "Av. Paulista, São Paulo")}
        >
          <Block center middle shadow>
            <Icon.FontAwesome 
              size={16}
              name="location-arrow"
              color={theme.colors.primary}
            />
          </Block>
        </TouchableOpacity>
      </Card>
    );
  }

  renderDrivingStatus = drive => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
        <Card shadow style={styles.drivingStatus}>
          <Image source={drive.icon} style={styles.drivingIcon} resizeMode="contain" />
          <Text 
            title 
            transform="capitalize"
            accent={drive.status === "pessímo"}
            tertiary={drive.status === "razoável"}
            primary={drive.status === "bom"}
            height={22}
          >
            {drive.status}
          </Text>
          <Text body tranform="capitalize">{drive.action}</Text>
        </Card>
      </TouchableOpacity>
    );
  }

  renderDriving() {
    return (
      <Block>
        
        <Block style={{ marginTop: theme.sizes.base, marginBottom: theme.sizes.base, paddingHorizontal: theme.sizes.base / 3 }}>
          <Text spacing={0.7} tranform="uppercase">Dados do Veículo</Text>
        </Block>

        <FlatList 
          horizontal
          // pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          data={mocks.drivingData}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={({ item }) => this.renderDrivingStatus(item)}
        />

        <Block row space="between">
          
          <Block center>
            <Text h3 gray medium>55</Text>
            <Text h3 gray medium>mph</Text>
          </Block>

          <Block />

          <Block center>
            <Text h3 gray medium>978.7</Text>
            <Text h3 gray medium>mi</Text>
          </Block>

        </Block>

      </Block>
    );
  }

  handleTripButton() {
    const { navigation } = this.props;

    return (
      <Block center middle style={styles.endTrip}>
        <Badge color={rgba(theme.colors.accent, '0.05')} size={144}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Welcome')}>
            <Badge color={theme.colors.accent} size={62}>
              <Icon.FontAwesome name="square" size={62 / 2.5} color="white" />
            </Badge>
          </TouchableOpacity>
        </Badge>
      </Block>
    );
  }

  render() {
    const { navigation } = this.props;
    const showMap = navigation.getParam('map');
    return (
      <React.Fragment>
        <ScrollView
          vertical
          // pagingEnabled
          scrollEnabled
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment='center'
          style={styles.trip}
        >
          {showMap ? this.renderMap() : this.renderChart() }
          {this.renderDriving()}
        </ScrollView>
        {this.handleTripButton()}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  trip: {
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
  },
  endTrip: {
    position: 'absolute',
    left: (width - 144) / 2,
    bottom: 0,
  },
  drivingIcon: {
    height: 56,
    marginBottom: theme.sizes.base * 2,
  },
  drivingStatus: {
    marginRight: theme.sizes.base,
    width: width / 2.568
  },
  mapMyLocation: {
    position: 'absolute',
    borderRadius: 4,
    bottom: theme.sizes.base,
    left: theme.sizes.base,
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    backgroundColor: theme.colors.white,
  },
  map: {
    height: 352,
  }
})
