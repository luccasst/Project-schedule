import AsyncStorage from "@react-native-community/async-storage";


const BASE_API = 'https://api.b7web.com.br/devbarber/api';

const BARBER_BACKEND = 'http://192.168.0.39:3010';

const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    return token;
}

export default {
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    signIn: async (email, password) => {
        const token = await getToken();
        const req = await fetch(`${BARBER_BACKEND}/login`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await req.json();
        return json;
    },

    signUpBackend: async (name, email, password, passwordConfirmation) => {
        const req = await fetch(`${BARBER_BACKEND}/usuario-comum`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password, passwordConfirmation})
        });
        const json = await req.json();
        return json;
    },

 /*    signUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await req.json();
        return json;
    }, */
    logout: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    getBarbers: async (lat=null, lng=null, address=null) => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BARBER_BACKEND}/barber?token=${token}&lat=${lat}&lng=${lng}&address=${address}`)
        const json = await req.json();
        return json;
    },
    getBarber: async(id) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BARBER_BACKEND}/barber/${id}?token=${token}`)
        const json = await req.json();
        return json
    }
}