import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        setLoading(true);
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                setLoading(false);
            })
            .catch((err) => {
                alert("Erro ao carregar as notas: " + err.message);
                setLoading(false);
            });
    };

    const deleteNote = (id) => {
        if (window.confirm("Tem certeza que deseja deletar esta nota?")) {
            setLoading(true);
            api
                .delete(`/api/notes/delete/${id}/`)
                .then((res) => {
                    if (res.status === 204) {
                        alert("Nota deletada com sucesso!");
                        getNotes();
                    } else {
                        alert("Falha ao deletar a nota.");
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    alert("Erro ao deletar a nota: " + error.message);
                    setLoading(false);
                });
        }
    };

    const createNote = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('file', file);
        }

        api
            .post("/api/notes/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                if (res.status === 201) {
                    alert("Nota criada com sucesso!");
                    setTitle("");
                    setContent("");
                    setFile(null);
                    getNotes();
                } else {
                    alert("Falha ao criar a nota.");
                }
                setLoading(false);
            })
            .catch((err) => {
                alert("Erro ao criar a nota: " + err.message);
                setLoading(false);
            });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="home-container">
            <div className="notes-section">
                <div className="section-header">
                    <h2>Minhas Notas</h2>
                    {loading && <div className="loading-spinner"></div>}
                </div>
                <div className="notes-grid">
                    {notes.length === 0 ? (
                        <p className="no-notes">Nenhuma nota encontrada. Crie uma nova nota!</p>
                    ) : (
                        notes.map((note) => (
                            <Note note={note} onDelete={deleteNote} key={note.id} />
                        ))
                    )}
                </div>
            </div>

            <div className="create-note-section">
                <h2>Criar Nova Nota</h2>
                <form onSubmit={createNote} className="create-note-form">
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="Digite o título da nota"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Conteúdo</label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Digite o conteúdo da nota"
                            disabled={loading}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">Anexar Arquivo (opcional)</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleFileChange}
                            disabled={loading}
                            className="file-input"
                        />
                        {file && (
                            <div className="file-preview">
                                <span className="file-name">{file.name}</span>
                                <button 
                                    type="button" 
                                    className="remove-file"
                                    onClick={() => setFile(null)}
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? "Criando..." : "Criar Nota"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Home;