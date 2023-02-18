import React from 'react';
import {
  Alert, Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import axios from "./axios/axiosClient";
// Modules
import { Controller, useForm } from 'react-hook-form';
// Components

interface FormData {
  email: string;
  password: string;
}

function useStyles() {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: 'rgb(93, 95, 222)',
      borderRadius: 8,
      height: 48,
      justifyContent: 'center',
    },
    buttonTitle: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: '600',
      lineHeight: 22,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 32,
    },
    forgotPasswordContainer: {
      alignItems: 'flex-end',
    },
    form: {
      alignItems: 'center',
      backgroundColor: 'rgb(58, 58, 60)',
      borderRadius: 8,
      flexDirection: 'row',
      height: 48,
      paddingHorizontal: 16,
    },
    label: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
      width: 80,
    },
    root: {
      backgroundColor: '#000000',
      flex: 1,
    },
    safeAreaView: {
      flex: 1,
    },
    subtitle: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 22,
    },
    textButton: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
    },
    textInput: {
      color: '#FFFFFF',
      flex: 1,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 34,
    },
  });
}

const App: React.FC = () => {
  const emailInput = React.useRef<TextInput>(null);
  const passwordInput = React.useRef<TextInput>(null);

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  let userName = undefined;
  let Password= undefined;
  const _signInAsync = async () => {

    console.log(userName)
    console.log(Password)
    try {
      const res = await axios.post("/login", {
        email: userName,
        password: Password,
      })
      console.log("GG LE BOSS");
      console.log(res.data)
  }
    catch (err){
      console.log(err)
      console.log("tu es une merde")
    }
  };

  const onSubmit = handleSubmit(({ email, password }) => {
    Alert.alert('Data', `Email: ${email}\nPassword: ${password}`);
  });

  const styles = useStyles();

  return (
      /*<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.root}>
          <SafeAreaView style={styles.safeAreaView}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
              <Text style={styles.title}>Welcome back!</Text>


              <Text style={styles.subtitle}>Sign in to your account</Text>


              <Pressable onPress={() => emailInput.current?.focus()}>
                <View style={styles.form}>
                  <Text style={styles.label}>Email</Text>

                  <Controller
                      control={control}
                      name="email"
                      render={() => (
                          <TextInput
                              autoCapitalize="none"
                              autoCorrect={false}
                              keyboardType="email-address"
                              onSubmitEditing={() => passwordInput.current?.focus()}
                              ref={emailInput}
                              returnKeyType="next"
                              style={styles.textInput}
                              textContentType="username"
                          />
                      )}
                  />
                </View>
              </Pressable>

              <Pressable onPress={() => passwordInput.current?.focus()}>
                <View style={styles.form}>
                  <Text style={styles.label}>Password</Text>

                  <Controller
                      control={control}
                      name="password"
                      render={() => (
                          <TextInput
                              autoCapitalize="none"
                              autoCorrect={false}
                              onSubmitEditing={onSubmit}
                              ref={passwordInput}
                              returnKeyType="done"
                              secureTextEntry
                              style={styles.textInput}
                              textContentType="password"
                          />
                      )}
                  />
                </View>
              </Pressable>
              <View style={styles.forgotPasswordContainer}>
                <Text style={styles.textButton}>Forgot password?</Text>
              </View>


              <TouchableOpacity onPress={onSubmit}>
                <View style={styles.button}>
                  <Text style={styles.buttonTitle}>Continue</Text>
                </View>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>*/
      <SafeAreaView>
        <TextInput
            style={{height: 40}}
            placeholder="userName"
            onChangeText={(text) => userName = text}
        />

        <TextInput
            style={{height: 40}}
            placeholder="Password"
            onChangeText={(text) => Password = text}
        />


        <Button
            title="Sign in!"
            onPress={_signInAsync}
        />
      </SafeAreaView>

  );
};

export default App;