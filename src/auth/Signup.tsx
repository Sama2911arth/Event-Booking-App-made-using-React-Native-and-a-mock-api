import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button, Title, TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

//basic signup page with email and otp input fields and a signup button
//taping on either signup or login will navigate to the center page
const Signup = () => {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const navigation = useNavigation();

    const handleSignup = async () => {
        navigation.navigate('Center')
    };

    const handleErr = () => {

        navigation.navigate('Center')

    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Signup</Title>
            <PaperTextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType='email-address'
                mode="outlined"
            />
            <PaperTextInput
                label="OTP"
                value={otp}
                onChangeText={setOTP}
                style={styles.input}
                mode="outlined"
            />
            <Button
                mode="text"
                onPress={handleSignup}
                style={styles.link}
            >
                Login
            </Button>
            <Button
                mode="contained"
                onPress={handleErr}
                style={styles.button}
            >
                Signup
            </Button>

        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
        paddingVertical: 8,
    },
    link: {
        marginTop: 16,
        textAlign: 'center',
    },
});