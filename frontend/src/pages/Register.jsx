import Form from "../components/Form"
import '../styles/Register.css'
import logo from '../assets/logo_sistema_odontologico.svg'

function Register() {
    return (
        <div className="register-container">
            <div className="register-content">
                <div className="register-header">
                    <img src={logo} alt="Logo OdontoSystem" className="register-logo" />
                    <h1>OdontoSystem</h1>
                    <p className="register-subtitle">Sistema de Gerenciamento Odontológico</p>
                </div>
                <div className="register-form-wrapper">
                    <h2>Criar Nova Conta</h2>
                    <p className="register-description">
                        Preencha os dados abaixo para criar sua conta no sistema
                    </p>
                    <Form route="/api/user/register/" method="register" />
                </div>
                <div className="register-footer">
                    <p>Já tem uma conta? <a href="/login">Faça login</a></p>
                </div>
            </div>
        </div>
    )
}

export default Register