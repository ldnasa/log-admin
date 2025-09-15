import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined } from "@ant-design/icons"
import { Button, Form, Input, Typography } from "antd"

const { Text, Title } = Typography

interface LoginRightProps {
    loading?: boolean;
    onFinish?: (values: string) => void;
}

export const LoginRight = ({loading, onFinish} : LoginRightProps) => {
    return (
        <div className="login-right">
            <div className="login-form-container">
                <Title level={2} className="login-title">Bem-vindo de volta!</Title>
                <Text className="login-subtitle">Faça login para acessar o painel</Text>

                <Form
                    name="login"
                    className="login-form"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Por favor, insira seu email!' },
                            { type: 'email', message: 'Email inválido!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="input-icon" />}
                            placeholder="Email"
                            className="login-input"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="input-icon" />}
                            placeholder="Senha"
                            className="login-input"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-button"
                            loading={loading}
                            block
                        >
                            ENTRAR
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
