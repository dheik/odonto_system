import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Página Não Encontrada</h2>
                <p className="not-found-description">
                    Desculpe, a página que você está procurando não existe ou foi movida.
                </p>
                <div className="not-found-actions">
                    <Link to="/" className="not-found-button">
                        Voltar para a Página Inicial
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;