import { useHttpRequest } from "@/composables/useHttpRequest";
import qs from 'qs';

export default function useAuth() {
    const { dataEndPoint: dataLogin, sendRequest: sendLogin, loading: loadingLogin, errorEndPoint: errorLogin } = useHttpRequest();
    const { dataEndPoint: dataLogout, sendRequest: sendLogout, loading: loadingLogout, errorEndPoint: errorLogout } = useHttpRequest();

    const login = async (params) => {
        const jsonData = {
            username: params.username,
            password: params.password,
            recaptcha: null,
        };

        // Serializar el objeto JSON dentro de un `URLSearchParams`
        const paramsObj = new URLSearchParams();
        paramsObj.append('jsonSend', JSON.stringify(jsonData));

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };

        // Enviar los datos con sendLogin
        await sendLogin('POST', 'site/login', paramsObj, headers);
    };

    const logout = async () => {
        sendLogout('POST', 'site/login')
    }

    return {
        dataLogin,
        login,
        loadingLogin,
        errorLogin,
        // single product
        dataLogout,
        logout,
        loadingLogout,
        errorLogout,
    }
}