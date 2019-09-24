import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons';
import { Block, Badge, Text, Card } from '../components';
import { styles as blockStyles } from '../components/Block';
import { styles as cardStyles } from '../components/Card';
import { theme, mocks } from '../constants';

const { width } = Dimensions.get('window');

export default class Welcome extends Component {
  static navigationOptions = {
    headerTitle: <Text style={theme.fonts.header}>Bem Vindo</Text>,
    headerRight: (
     <TouchableOpacity>
      <Block flex={false}>
        <Image 
          resizeMode="contain"
          source={require('../assets/images/Icon/Menu.png')}
          style={{ width: 20, height: 24 }}
        />
        <Badge 
          size={13} 
          color={theme.colors.accent} 
          style={{ position: 'absolute', top: -4, right: -4 }}
        />
      </Block>
     </TouchableOpacity>
    )
  }

  handleMonthly() {
    const { navigation } = this.props;

    return (
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={() => navigation.navigate('Rewards')}
      >
        <Card 
        style={{ 
          paddingVertical: theme.sizes.padding,
          shadowColor: theme.colors.black,
          shadowOpacity: 0.11,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 13,
          elevation: 5, // for android
        }}>
          <Image 
            resizeMode="contain"
            source={require('../assets/images/Icon/More.png')}
            style={styles.moreIcon}
          />
          <Block>

            <Block center>
            <Image 
              resizeMode="contain"
              source={require('../assets/images/kicks.png')}
              style={{ width: 200, height: 100 }}
            />
              <Text spacing={0.7}>Valor do Veículo</Text>
              <Text h1 primary spacing={1.7}>R$68.640</Text>
              <Text spacing={0.7}>Nissan Kicks</Text>
            </Block>

            <Block color='gray3' style={styles.hLine} />

            <Block row>
              
              <Block center>
                <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>8.1</Text>
                <Text body spacing={0.7}>Pontuação</Text>
              </Block>

              <Block flex={false} color='gray3' style={styles.vLine} />

              <Block center>
                <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>37</Text>
                <Text body spacing={0.7}>Nível</Text>
              </Block>
            
            </Block>

          </Block>
        </Card>
      </TouchableOpacity>
    );
  }

  handleAwards() {
    return (
      <LinearGradient
        end={{ x:1, y:0 }}
        style={[ blockStyles.row, cardStyles.card, styles.awards ]}
        colors={[ '#FF988A', theme.colors.accent]}
      >
        <Block middle flex={0.8}>
          <Badge color={(rgba(theme.colors.white, '0.2'))} size={74}>
            <Badge color={(rgba(theme.colors.white, '0.2'))} size={52}>
              <Icon.FontAwesome name="trophy" color="white" size={theme.sizes.h2} />
            </Badge>
          </Badge>
        </Block>
        <Block middle>
          <Text size={theme.sizes.base} spacing={0.4} medium white>Wohoo!</Text>
          <Text size={theme.sizes.base} spacing={0.4} medium white>Perfil Campeão!</Text>
        </Block>
      </LinearGradient>
    )
  }

  renderTrip = trip => {
    return (
      <Card 
        key={`trip-${trip.id}`} 
        style={{
          shadowColor: theme.colors.black,
          shadowOpacity: 0.11,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 13,
          elevation: 5, // for android
        }}
      >
        <Block row space="between" style={{ marginBottom: theme.sizes.base }}>
          <Text spacing={0.5} caption>{trip.date}</Text>
          <Text spacing={0.5} caption medium primary>{trip.score}</Text>
          <Text spacing={0.5} caption>{trip.distance}</Text>
        </Block>
        <Block row center>
          <Badge color={rgba(theme.colors.accent, '0.2')} size={14} style={{ marginRight: 8 }}>
            <Badge color={theme.colors.accent} size={8} />
          </Badge>
          <Text spacing={0.5} color="gray">{trip.from}</Text>
        </Block>
        <Block row center style={{ paddingVertical: 4 }}>
          <Badge color="gray2" size={4} style={{ marginLeft: 4.5 }} />
        </Block>
        <Block row center>
          <Badge color={rgba(theme.colors.primary, '0.2')} size={14} style={{ marginRight: 8 }}>
            <Badge color={theme.colors.primary} size={8} />
          </Badge>
          <Text spacing={0.5} color="gray">{trip.to}</Text>
        </Block>
      </Card>
    );
  }

  handleTrips() {
    return (
      <React.Fragment>
        <Block style={{ marginBottom: theme.sizes.base }}>
          <Text spacing={0.4} transform="uppercase">Trajetos Recentes</Text>
        </Block>
        <Block style={{ marginBottom: 50 }}>
          {mocks.trips.map(trip => this.renderTrip(trip))}
        </Block>
      </React.Fragment>
    );
  }

  handleTripButton() {
    const { navigation } = this.props;

    return (
      <Block center middle style={styles.startTrip}>
        <Badge color={rgba(theme.colors.primary, '0.1')} size={144}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Trip')}>
            <Badge color={theme.colors.primary} size={62}>
              <Icon.FontAwesome name="automobile" size={62 / 2} color="white" />
            </Badge>
          </TouchableOpacity>
        </Badge>
      </Block>
    );
  }

  render() {
    return (
      <React.Fragment>
        <ScrollView 
          vertical
          // pagingEnabled
          scrollEnabled
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment='center'
          style={styles.welcome}
        >
          {this.handleMonthly()}
          {this.handleAwards()}
          {this.handleTrips()}
        </ScrollView>
          {this.handleTripButton()}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
  },
  hLine: {
    marginVertical: theme.sizes.base * 2,
    marginHorizontal: theme.sizes.base * 2,
    height: 1,
  },
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },
  moreIcon: {
    width: 16,
    height: 17,
    position: 'absolute',
    right: theme.sizes.base,
    top: theme.sizes.base,
  },
  awards: {
    padding: theme.sizes.base,
    marginBottom: theme.sizes.padding,
  },
  startTrip: {
    position: 'absolute',
    left: (width - 144) / 2,
    bottom: 0,
  },
});
