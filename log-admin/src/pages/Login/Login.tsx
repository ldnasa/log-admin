import { useState } from "react";
import { LoginLeft } from "../../components/Login/LoginLeft";
import { LoginRight } from "../../components/Login/LoginRight";
import './Login.css'

export const Login = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = (values: string) => {
        setLoading(true);
        console.log('Login:', values);
        // Aqui você fará a chamada para API
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="login-container">
            <LoginLeft />
            <LoginRight
                loading={loading}
                onFinish={onFinish}
            />
        </div>
    )
}
