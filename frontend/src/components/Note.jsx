import React, { useState } from "react";
import "../styles/Note.css"

function Note({ note, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const formattedDate = new Date(note.created_at).toLocaleDateString("pt-BR");
    const formattedTime = new Date(note.created_at).toLocaleTimeString("pt-BR");

    const truncateContent = (content, maxLength = 150) => {
        if (content.length <= maxLength) return content;
        return content.slice(0, maxLength) + "...";
    };

    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
                return '📄';
            case 'doc':
            case 'docx':
                return '📝';
            case 'xls':
            case 'xlsx':
                return '📊';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return '🖼️';
            default:
                return '📎';
        }
    };

    return (
        <div className={`note-container ${isExpanded ? 'expanded' : ''}`}>
            <div className="note-header">
                <h3 className="note-title">{note.title}</h3>
                <div className="note-actions">
                    <button 
                        className="expand-button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        title={isExpanded ? "Recolher" : "Expandir"}
                    >
                        {isExpanded ? "−" : "+"}
                    </button>
                    <button 
                        className="delete-button"
                        onClick={() => onDelete(note.id)}
                        title="Deletar nota"
                    >
                        ×
                    </button>
                </div>
            </div>
            
            <div className="note-body">
                <p className="note-content">
                    {isExpanded ? note.content : truncateContent(note.content)}
                </p>
                {note.file && (
                    <div className="note-file">
                        <a 
                            href={note.file} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="file-link"
                        >
                            {getFileIcon(note.file_name)} {note.file_name}
                        </a>
                    </div>
                )}
            </div>

            <div className="note-footer">
                <div className="note-metadata">
                    <span className="note-date">
                        Criado em {formattedDate}
                    </span>
                    <span className="note-time">
                        às {formattedTime}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Note