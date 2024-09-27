import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Details = ({ route }) => {
    const navigation = useNavigation();
    const { event } = route.params || {}; // Default to an empty object if route.params is null

    // Show fallback message if the event is null
    if (!event) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyMessage}>
                    Click on an event from the home page to get details.
                </Text>
            </View>
        );
    }

    // If the event is not null, display event details
    //description of the event
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Card style={styles.card}>
                <Card.Cover source={{ uri: event.imageUrl }} style={styles.cardImage} />
                <Card.Content>
                    <Text style={styles.cardTitle}>{event.title}</Text>
                    <Text style={styles.cardLocation}>{event.location}</Text>
                    <Text style={styles.cardDate}>{event.date}</Text>
                    <Text style={styles.cardDescription}>{event.description}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button style={styles.button} onPress={() => navigation.navigate("BookingInput")}>
                        Book Now
                    </Button>
                </Card.Actions>
            </Card>
        </ScrollView>
    );
};

export default Details;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    card: {
        width: '100%',
        borderRadius: 10,
        elevation: 3,
    },
    cardImage: {
        height: 500,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardLocation: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 5,
    },
    cardDate: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    cardDescription: {
        fontSize: 16,
        color: 'gray',
    },
    button: {
        marginTop: 10,
        width: '100%',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});
