import 'react-native-get-random-values'
import WebviewCrypto from 'react-native-webview-crypto'
// import PolyfillCrypto from 'react-native-webview-crypto'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Main from './src/screens/Main'
import { AuthProvider } from './src/contexts'
export default function App () {
  return (
    <SafeAreaView style={styles.container}>
      <WebviewCrypto />
      <AuthProvider>
        <Main />
      </AuthProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center'
  }
})