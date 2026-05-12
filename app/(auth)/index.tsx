import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import FormInput from '@/components/ui/FormInput';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { apiPost } from '../api/apiClient';
import { getSecureStorage, setSecureStorage } from '../utils/secureStorage';

export default async function Login() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [res, setRes] = useState<any>('');
    const handleLogin = async () => {
        setLoading(true);
        setError('');
        // Add your login logic here
        try {
            const data = await apiPost('auth/login', { email, password });
            setLoading(false);
            setError('');
            setRes(data);

        } catch (error) {
            setLoading(false);
            setError(`Invalid email or password ${error}`);
            setRes('');
        } finally {
            setLoading(false);
            setError('');
        }
        await setSecureStorage("userToken", {
            token: "abc123",
            email: "test@gmail.com",
        });
    }
    const user = await getSecureStorage("userToken");
    console.log(user.token);
    return (
        <ThemedView style={styles.main}>
            <View style={styles.login}>
                <ThemedText type="title">
                    <Text>Login</Text>
                </ThemedText>
                <ThemedText type="default">
                    <Text>Enter your email and password</Text>
                </ThemedText>
            </View>
            <View style={styles.submit}>
                <FormInput type='email-address' label="Email" value={email} onChangeText={setEmail} style={styles.input} />
                <FormInput type='default' label="Password" value={password} onChangeText={setPassword} style={styles.input} />
                <Button title="Login" color={error ? 'red' : '#134E8E'} onPress={handleLogin} disabled={loading} />
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    login: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 200,
        marginBottom: 30,
    },
    input: {
        width: 300,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        height: 50,
        //    backgroundColor: 'transparent',
        color: '#fff',
    },
    submit: {
        gap: 15,
    },
});