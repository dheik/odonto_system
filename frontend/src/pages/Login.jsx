import Form from '../components/Form'
import '../styles/Login.css'

function Login() {
    return (
        <div className="login-container">
            <div className="login-content">
                <h1>Bem-vindo ao Sistema Odontológico</h1>
                <p className="login-description">
                    Faça login para acessar o sistema de gerenciamento odontológico
                </p>
                <div className="login-form-wrapper">
                    <Form route="/api/token/" method="login" />
                </div>
            </div>
        </div>
    )
}

export default Login