import { StyleSheet, Dimensions } from 'react-native'

export const { height } = Dimensions.get('window');
export const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0EFF5'
    },
    title: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    body: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },
});