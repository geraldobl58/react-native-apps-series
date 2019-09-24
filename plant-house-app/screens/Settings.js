import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';
import Slider from 'react-native-slider';

import { Button, Block, Text, Divider } from "../components";
import { theme, mocks } from "../constants";

class Settings extends Component {
  state = {
    budget: 500,
    monthly_cap: 1000,
    notifications: true,
    newsletter: false,
    editing: null,
    profile: {},
  };

  componentDidMount() {
    this.setState({ profile: this.props.profile });
  }

  handleEdit(name, text) {
    const { profile } = this.state;
    profile[name] = text;

    this.setState({ profile });
  };

  toggleEdit(name) {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  };

  renderEdit(name) {
    const { profile, editing } = this.state;

    if (editing === name) {
      return (
        <TextInput 
          defaultValue={profile[name]}
          onChangeText={text => this.handleEdit([name], text)}
        />
      );
    }
    
    return <Text bold>{profile[name]}</Text>
  };

  render() {

    const { profile, editing } = this.state;

    return (
      <Block>
        <Block flex={false} row center space='between' style={styles.header}>
          <Text h1 bold>Perfil</Text>
          <Button>
            <Image 
              source={profile.avatar}
              style={styles.avatar}
            />
          </Button>
        </Block>

        <ScrollView
           vertical
           // pagingEnabled
           // scrollEnabled
           showsVerticalScrollIndicator={false}
           // scrollEventThrottle={16}
           // snapToAlignment="center"
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <Block style={styles.inputs}>
            <Block row space='between' margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>Usuário</Text>
                {this.renderEdit('username')}
              </Block>
              <Text medium secondary onPress={() => this.toggleEdit('username')}>
                {editing === 'username' ? 'Salvar' : 'Editar'}
              </Text>
            </Block>
            <Block row space='between' margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>Local</Text>
                {this.renderEdit('location')}
              </Block>
              <Text medium secondary onPress={() => this.toggleEdit('location')}>
                {editing === 'location' ? 'Salvar' : 'Editar'}
              </Text>
            </Block>
            <Block row space='between' margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>E-mail</Text>
                <Text bold>{profile.email}</Text>
              </Block>
            </Block>
          </Block>

          <Divider margin={[ theme.sizes.base, theme.sizes.base * 2 ]} />

          <Block style={styles.slider}>
            <Block margin={[10, ]}>
              <Text gray2 style={{ marginBottom: 10}}>Despesas</Text>
              <Slider 
                minimumValue={0}
                maximumValue={1000}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 6, borderRadius: 6 }}
                minimumTrackTintColor={theme.colors.secondary}
                maximumTrackTintColor="rgba(157,163,180,0.10)"
                value={this.state.budget}
                onValueChange={value => this.setState({ budget: value })}
              />
              <Text caption gray right>R${this.state.budget.toFixed(0)}</Text>
            </Block>
            <Block margin={[10, ]}>
              <Text gray2 style={{ marginBottom: 10}}>Limite Mensal</Text>
              <Slider 
                minimumValue={0}
                maximumValue={5000}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 6, borderRadius: 6 }}
                minimumTrackTintColor={theme.colors.secondary}
                maximumTrackTintColor="rgba(157,163,180,0.10)"
                value={this.state.monthly_cap}
                onValueChange={value => this.setState({ monthly_cap: value })}
              />
              <Text caption gray right>R${this.state.monthly_cap.toFixed(0)}</Text>
            </Block>
          </Block>

          <Divider />

          <Block style={styles.toggles}>
            <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
              <Text gray2>Notificações</Text>
              <Switch 
                value={this.state.notifications}
                onValueChange={value => this.setState({ notifications: value })}
              />
            </Block>
            <Block row center space="between" style={{ marginBottom: theme.sizes.base * 3 }}>
              <Text gray2>Promoções</Text>
              <Switch 
                value={this.state.newsletter}
                onValueChange={value => this.setState({ newsletter: value })}
              />
            </Block>
          </Block>

        </ScrollView>
      </Block>
    )
  }
}

Settings.defaultProps = {
  profile: mocks.profile,
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRows: {
    alignItems: 'flex-end',
  },
  slider: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  }
})
