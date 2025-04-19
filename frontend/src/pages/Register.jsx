import Form from "../components/Form"
import '../styles/Register.css'

function Register() {
    return (
        <div className="register-container">
            <div className="register-content">
                <h1>Criar Nova Conta</h1>
                <p className="register-description">
                    Preencha os dados abaixo para se cadastrar no sistema
                </p>
                <div className="register-form-wrapper">
                    <Form route="/api/user/register/" method="register" />
                </div>
            </div>
        </div>
    )
}

export default Register