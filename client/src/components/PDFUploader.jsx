import React, { useState } from 'react';
import { Upload, FileText, Loader2, X } from 'lucide-react';
import { pdfService } from '../services/api';
import { useAppContext } from '../context/AppContext';

const PDFUploader = ({ onUploadSuccess }) => {
    const { t } = useAppContext();
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const validateAndSetFile = (selectedFile) => {
        if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf'))) {
            setFile(selectedFile);
            setError(null);
        } else {
            setError(t('home.selectPdf'));
            setFile(null);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        validateAndSetFile(selectedFile);
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation(); // Prevent triggering the dropzone click
        setFile(null);
        setError(null);
        const input = document.getElementById('pdf-upload-input');
        if (input) input.value = ''; // Reset input so same file can be selected again
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDragging(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setError(null);
        try {
            const data = await pdfService.uploadPdf(file);
            onUploadSuccess(data);
        } catch (err) {
            setError(err.response?.data?.error || t('common.error'));
        } finally {
            setUploading(false);
        }
    };

    const handleUploadClick = () => {
        const input = document.getElementById('pdf-upload-input');
        if (input) input.click();
    };

    return (
        <div style={styles.container}>
            <div
                style={{
                    ...styles.dropzone,
                    ...(isDragging ? styles.dropzoneActive : {})
                }}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploadClick}
            >
                <Upload size={48} color={isDragging ? "var(--brand-primary)" : "var(--brand-accent)"} />
                <p style={{ marginTop: '1rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    {isDragging ? (
                        t('home.dropText')
                    ) : (
                        <> {t('home.dropText')}
                        <label style={styles.browseLabel}>
                            <input id="pdf-upload-input" type="file" accept="application/pdf" onChange={handleFileChange} style={{ display: 'none' }} />
                            <span style={{ marginLeft: '4px' }}>{t('home.browse')}</span>
                        </label></>
                    )}
                </p>
                {file && (
                    <div style={styles.fileInfo}>
                        <FileText size={20} />
                        <span style={{ flex: 1, marginLeft: '8px' }}>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                        <button onClick={handleRemoveFile} style={styles.removeBtn} title="Remove file">
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>

            {error && <div style={styles.error}>{error}</div>}
            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                style={uploading ? {...styles.button, ...styles.disabledButton} : styles.button}
            >
                {uploading ? <><Loader2 size={20} className="spin" /> {t('common.uploading')}</> : t('home.uploadBtn')}
            </button>
            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        maxWidth: '600px',
        margin: '0 auto'
    },
    dropzone: {
        width: '100%',
        height: '250px',
        border: '2px dashed var(--border-color)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-secondary)',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
    },
    dropzoneActive: {
        borderColor: 'var(--brand-primary)',
        backgroundColor: 'var(--bg-tertiary)',
        boxShadow: '0 0 15px rgba(79, 70, 229, 0.2)',
        transform: 'scale(1.01)'
    },
    browseLabel: {
        color: 'var(--brand-primary)',
        fontWeight: '600',
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    fileInfo: {
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'var(--bg-tertiary)',
        padding: '8px 16px',
        borderRadius: '20px',
        color: 'var(--brand-primary)',
        fontSize: '0.9rem',
        border: '1px solid var(--border-color)'
    },
    removeBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'var(--text-muted)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px',
        borderRadius: '50%',
        transition: 'color 0.2s',
        marginLeft: '8px'
    },
    error: {
        color: '#ef4444',
        fontSize: '0.9rem',
        fontWeight: '500'
    },
    button: {
        padding: '12px 24px',
        backgroundColor: 'var(--brand-primary)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'background-color 0.2s'
    },
    disabledButton: {
        backgroundColor: 'var(--border-color)',
        cursor: 'not-allowed'
    }
};

export default PDFUploader;
