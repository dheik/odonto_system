import Form from '../components/Form'
import '../styles/Login.css'
import logo from '../assets/logo_sistema_odontologico.svg'

function Login() {
    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-header">
                    <img src={logo} alt="Logo OdontoSystem" className="login-logo" />
                    <h1>OdontoSystem</h1>
                    <p className="login-subtitle">Sistema de Gerenciamento Odontológico</p>
                </div>
                <div className="login-form-wrapper">
                    <h2>Acesso ao Sistema</h2>
                    <p className="login-description">
                        Entre com suas credenciais para acessar o sistema
                    </p>
                    <Form route="/api/token/" method="login" />
                </div>
                <div className="login-footer">
                    <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login