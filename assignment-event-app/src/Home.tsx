import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextInput, Card } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//getting the dimensions of the screen
const { width, height } = Dimensions.get('window');

//interface for type safety
interface ApiResponse {
    date: string;
    description: string;
    id: number;
    imageUrl: string;
    location: string;
    title: string;
}

const Home = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState<ApiResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async (url: string) => {
        //loading spinner
        try {
            setLoading(true);
            const response = await axios.get(url); //fetching data from the mock api
            setData(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData('https://dev-tu4ac2vhvnontna.api.raw-labs.com/mock/json-api');
    }, []);

    //filtering the data based on the search query
    const filteredEvents = search ? data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())) : data;

    return (
        <View style={styles.container}>
            {/* search input */}
            <TextInput
                label="Search for events"
                value={search}
                onChangeText={setSearch}
                keyboardType='default'
                left={<TextInput.Icon icon="magnify" style={{ paddingTop: 8, paddingLeft: 15 }} />}
                style={styles.searchInput}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />  // Show loading spinner
            ) : (
                <FlatList
                    data={filteredEvents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Card style={styles.card} onPress={() => navigation.navigate("Details", { event: item })}>
                            <Card.Cover source={{ uri: item.imageUrl }} style={styles.cardImage} />
                            <Card.Content>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardLocation}>{item.location}</Text>
                                <Text style={styles.cardDate}>{item.date}</Text>
                            </Card.Content>
                        </Card>
                    )}
                />
            )}
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchInput: {
        marginBottom: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderRadius: 20,
        elevation: 3,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        marginVertical: 10,
        borderRadius: 10,
        elevation: 3,
    },
    cardImage: {
        height: height / 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardLocation: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    cardDate: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 5,
    }
});
