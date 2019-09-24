import React, { Component } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Alert
} from "react-native";

import { Button, Block, Text, Input } from "../components";
import { theme } from "../constants";

const VALID_EMAIL = "contato@g3developer.herokuapp.com";

export default class Forgot extends Component {
  state = {
    email: VALID_EMAIL,
    errors: [],
    loading: false
  };

  handleForgot() {
    const { navigation } = this.props;
    const { email } = this.state;
    const errors = [];

    Keyboard.dismiss();

    this.setState({ loading: true });

    setTimeout(() => {
      if (email !== VALID_EMAIL) {
        errors.push("email");
      }
    
      this.setState({ errors, loading: false });

      if (!errors.length) {
        Alert.alert(
          'Sucesso',
          'Por favor verifique seu e-mail',
          [
            {
              text: 'OK', onPress: () => {
                navigation.navigate('Login')
              }
            }
          ],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert(
          'Houve um erro ao enviar sua senha',
          'Por favor verifique o e-mail digitado',
          [
            { 
              text: 'Tente Novamente'
            }
          ],
          {
            cancelable: false,
          }
        );
      }
    }, 2000);
  }


  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.forgot}>
        <Block padding={[5, theme.sizes.base * 1.6]}>
          <Text h1 bold>
            Recuperar Senha
          </Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            
            <Button gradient onPress={() => this.handleForgot()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Enviar
                </Text>
              )}
            </Button>
            <Button onPress={() => navigation.navigate("Login")}>
              <Text gray caption center>
                Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
})
