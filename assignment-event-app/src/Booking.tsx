import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Booking = () => {
    const [bookingDetails, setBookingDetails] = useState<{ name: string; email: string; tickets: number } | null>(null);

    useEffect(() => {
        fetchBookingDetails();
    }, []);

    // Fetch booking details from local storage(async storage)
    const fetchBookingDetails = async () => {

        try {
            const storedDetails = await AsyncStorage.getItem('bookingDetails');
            if (storedDetails) {
                setBookingDetails(JSON.parse(storedDetails));
            } else {
                Alert.alert('No Booking Found', 'No booking details found in local storage.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch booking details');
        }
    };

    return (
        // showing the most recent booking
        <View style={styles.container}>
            {bookingDetails ? (
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>Booking Details</Text>
                    <Text style={styles.detail}>Name: {bookingDetails.name}</Text>
                    <Text style={styles.detail}>Email: {bookingDetails.email}</Text>
                    <Text style={styles.detail}>Tickets: {bookingDetails.tickets}</Text>
                </View>
            ) : (
                <Text style={styles.noDetails}>No booking details available.</Text>
            )}
        </View>
    );
};

export default Booking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f2f5',
    },
    detailsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    detail: {
        fontSize: 18,
        marginBottom: 10,
        color: '#555',
    },
    noDetails: {
        fontSize: 18,
        color: '#555',
    },
});