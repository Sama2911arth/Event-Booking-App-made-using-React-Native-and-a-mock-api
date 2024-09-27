import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { TextInput, Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingInput = () => {
    //states for name, email, tickets and errors
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [tickets, setTickets] = useState<number>(1);
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    // Validate the input fields
    const validate = () => {
        let valid = true;
        let errors: { name?: string; email?: string } = {};

        if (!name) {
            errors.name = 'Name is required';
            valid = false;
        }

        if (!email) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    // Save booking details to local storage(async storage)
    const handleBooking = async () => {
        if (validate()) {
            const bookingDetails = { name, email, tickets };
            try {
                await AsyncStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
                Alert.alert('Booking Successful', `Name: ${name}, Email: ${email}, Tickets: ${tickets}`);
                // Reset the input fields
                setName('');
                setEmail('');
                setTickets(1);
            } catch (error) {
                Alert.alert('Error', 'Failed to save booking details');
            }
        }
    };

    return (
        // booking input form with name, email, and number of tickets input fields 
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.title}>Book Now</Text>
                    <TextInput
                        label="Enter your name"
                        value={name}
                        onChangeText={setName}
                        keyboardType='default'
                        style={styles.input}
                        error={!!errors.name}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    <TextInput
                        label="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        style={styles.input}
                        error={!!errors.email}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    <Text style={styles.label}>Select number of tickets</Text>
                    <Picker
                        selectedValue={tickets}
                        onValueChange={(itemValue) => setTickets(itemValue)}
                        style={styles.picker}
                    >
                        {[...Array(10).keys()].map((i) => (
                            <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
                        ))}
                    </Picker>
                    <TouchableOpacity style={styles.button} onPress={handleBooking}>
                        <Text style={styles.buttonText}>Book Now</Text>
                    </TouchableOpacity>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    card: {
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: '#555',
    },
    picker: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    button: {
        backgroundColor: 'rgb(120, 69, 172)',
        padding: 15,
        borderRadius: 40,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default BookingInput;