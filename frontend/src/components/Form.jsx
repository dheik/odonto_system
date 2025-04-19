import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Cadastrar";

    const fetchUserData = async () => {
        try {
            const response = await api.get('/api/user/profile/');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const postData = { username, password };
            if (method === "register") {
                postData.email = email;
            }
            
            // Login ou registro
            const res = await api.post(route, postData);
            
            if (method === "login") {
                // Salvar tokens
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                // Buscar dados completos do usuário
                const userData = await fetchUserData();
                
                if (userData) {
                    localStorage.setItem('user', JSON.stringify(userData));
                } else {
                    // Fallback para dados básicos se a busca falhar
                    localStorage.setItem('user', JSON.stringify({
                        username: username,
                        email: email || `${username}@exemplo.com`
                    }));
                }

                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error('Erro:', error);
            alert(error.response?.data?.detail || 'Erro ao processar a requisição');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            {method === "register" && (
                <input
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
            )}
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form;