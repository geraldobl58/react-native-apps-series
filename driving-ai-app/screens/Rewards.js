import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons';
import { CircularProgress } from 'react-native-circular-progress';

import { Block, Badge, Card, Text, Progress } from '../components';
import { theme, mocks } from '../constants';

export default class Rewards extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text
          style={[
            theme.fonts.header,
            { paddingLeft: theme.sizes.base },
          ]}
        >
          Pontuação
        </Text>
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/Icon/Back.png')}
            style={{ width: 20, height: 24, marginRight: theme.sizes.base }}
          />
        </TouchableOpacity>
      )
    }
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

  renderRewards() {
    return (
      <Card 
        style={{
          paddingHorizontal: theme.sizes.base * 2,
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
          <Text title spacing={1} style={{ marginVertical: 8 }}>Pontuação</Text>
          <Text>
            <Text gray tranform="uppsercase">Nível</Text>
            <Text primary> 37</Text>
          </Text>
        </Block>

        <Block color="gray3" style={styles.hLine} />

        <Block row>
          <Block center flex={0.8}>
            <Text size={12} spacing={1} primary>79</Text>
            <Text size={12} spacing={0.7}>Trajetos</Text>
          </Block>

          <Block center flex={2}>
            <Text size={12} spacing={1} primary>12</Text>
            <Text size={12} spacing={0.7}>Horas</Text>
          </Block>

          <Block center flex={0.8}>
            <Text size={12} spacing={1} primary>2.700</Text>
            <Text size={12} spacing={0.7}>KM</Text>
          </Block>
        </Block>

        <Block color="gray3" style={styles.hLine} />

        <Block style={{ marginBottom: theme.sizes.base }}>
          <Block row space="between">
            <Text body spacing={0.7}>Freios</Text>
            <Text caption spacing={0.7}>8.1</Text>
          </Block>
          <Progress value={0.81} />
        </Block>

        <Block style={{ marginBottom: theme.sizes.base }}>
          <Block row space="between">
            <Text body spacing={0.7}>Velocidade</Text>
            <Text caption spacing={0.7}>9.8</Text>
          </Block>
          <Progress value={0.98} />
        </Block>

        <Block style={{ marginBottom: theme.sizes.base }}>
          <Block row space="between">
            <Text body spacing={0.7}>Distância do Trajeto</Text>
            <Text caption spacing={0.7}>7.4</Text>
          </Block>
          <Progress endColor="#D37694" value={0.74} />
        </Block>

        <Block color="gray3" style={styles.hLine} />

        <Block row center space="between">
          <Text>Total</Text>
          <Text size={20} spacing={1} primary>30km</Text>
        </Block>

      </Card>
    );
  }

  renderChallenges() {
    return (
      <Block>
        
        <Block style={{ marginTop: theme.sizes.base, marginBottom: theme.sizes.base, paddingHorizontal: theme.sizes.base / 3 }}>
          <Text spacing={0.7} tranform="uppercase">Desafios</Text>
        </Block>

        <Card 
          row 
          color="gray"
          style={{
            marginBottom: 50,
            shadowColor: theme.colors.black,
            shadowOpacity: 0.11,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 13,
            elevation: 5, // for android
          }}
        >
          <Block middle flex={0.6}>
            <Badge color={(rgba(theme.colors.white, '0.2'))} size={74}>
              <Badge color={(rgba(theme.colors.white, '0.2'))} size={52}>
                <Icon.FontAwesome name="check" color="white" size={theme.sizes.h1} />
              </Badge>
            </Badge>
          </Block>
          <Block middle>
            <Text size={12} spacing={0.4} small white>Acidente no Trajeto - 0</Text>
            <Text size={12} spacing={0.4} small white>Duração do Trajeto - 40min</Text>
          </Block>
        </Card>

      </Block>
    );
  }

  render() {
    return (
      <ScrollView
        vertical
        // pagingEnabled
        scrollEnabled
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment='center'
        style={styles.rewards}
      >
        {this.handleMonthly()}
        {this.renderRewards()}
        {this.renderChallenges()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  rewards: {
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
  },
  hLine: {
    marginVertical: theme.sizes.base,
    height: 1,
  },
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },
})
