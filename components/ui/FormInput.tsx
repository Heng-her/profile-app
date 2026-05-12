import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  type: TextInputProps['keyboardType'];
}

export default function FormInput({ label, type, ...props }: FormInputProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          cursorColor="#fff"
          placeholderTextColor="#aaa"
          {...props}
          keyboardType={type}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4, 
  },

  container: {
    position: 'relative',
    borderWidth: 0,
    // borderColor: '#fff',
    // backgroundColor: '#33333350',
    borderRadius: 10,
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    justifyContent: 'center',
  },

  label: {
    position: 'absolute',
    top: -8, // 👈 less jump
    left: 12,
    backgroundColor: "#000000",
    paddingHorizontal: 6,
    fontSize: 13,
    color: '#aaa',
  },

  input: {
    fontSize: 15,
    height: 35,
    // color: '#fff',
    padding: 0,
    backgroundColor: 'transparent',
    ...(Platform.OS === 'web' && {
      outlineStyle: 'none' as any,
    }),
  },
});