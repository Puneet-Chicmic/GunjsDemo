import React, { useState } from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Platform
} from 'react-native'
import { FilledButton, TextButton } from '../components/Button'
import { Input } from '../components/Input'
import { useAuthDispatch, authUser, createUser } from '../contexts'

export default function Auth () {
  const [hasAccount, setAccount] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [key, setKey] = useState('')
  const [loginUsername, setLoginUsername] = useState('')

  const [loginPass, setLoginPass] = useState('')

  const dispatch = useAuthDispatch()
  const toggleState = () => {
    setAccount(!hasAccount)
  }

  const Login = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View>
          <Text style={styles.headerTitle}>Demo</Text>
        </View>
        <Input value={loginUsername} onChangeText={setLoginUsername} placeholder='Enter your Name' />
        <Input
          value={loginPass}
          onChangeText={setLoginPass}
          placeholder='Password'
        />
        <FilledButton onPress={() => authUser(dispatch, { username:loginUsername,password:loginPass })}>Login</FilledButton>
        <TextButton onPress={toggleState}>Create One</TextButton>
      </KeyboardAvoidingView>
    )
  }
  const Register = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View>
          <Text style={styles.headerTitle}>Demo</Text>
        </View>
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder='Username'
        />
         <Input
          value={password}
          onChangeText={setPassword}
          placeholder='Password'
        />
        <FilledButton onPress={() =>
  createUser(dispatch, { username: username,password:password })
    }>Register</FilledButton>
        <TextButton onPress={toggleState}>I already have an account</TextButton>
      </KeyboardAvoidingView>
    )
  }
  return hasAccount ? Login() : Register()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold'
  }
})