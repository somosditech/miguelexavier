// HotsiteEditor.jsx – Gerencia links do hotsite (Instagram, Lattes)
import { useState, useEffect } from 'react';
import { fetchHotsiteLinks, updateHotsiteLink } from '../services/adminApi';
import { Save, Link } from 'lucide-react';
import '../styles/Editor.css';

// Labels dos links e suas dicas contextuais
const LINK_HINTS = {
  Instagram: {
    placeholder: 'https://instagram.com/seu_perfil',
    hint: 'Insira a URL completa do seu perfil no Instagram',
  },
  Lattes: {
    placeholder: 'http://lattes.cnpq.br/00000000000',
    hint: 'Insira a URL completa do seu currículo Lattes',
  },
  'E-Mail': {
    placeholder: 'seuemail@exemplo.com',
    hint: 'Insira o seu e-mail',
  }
};

// Labels que devem ser ocultados nesta tela
const HIDDEN_LABELS = ['WhatsApp'];

function HotsiteEditor() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const data = await fetchHotsiteLinks();
      const filtered = data
        .filter(l => !HIDDEN_LABELS.includes(l.label))
        .sort((a, b) => a.order - b.order);
      setLinks(filtered);
    } catch (e) {
      setMessage('Erro ao carregar links');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (id, field, value) => {
    setLinks(prev =>
      prev.map(l => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      await Promise.all(
        links.map(link =>
          updateHotsiteLink(link.id, {
            url: link.url || null,
            is_active: !!link.is_active,
          })
        )
      );
      setMessage('Links salvos com sucesso!');
      setMessageType('success');
    } catch (e) {
      setMessage('Erro ao salvar links');
      setMessageType('error');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="editor-page">
      <div className="editor-header">
        <div>
          <h1><Link size={28} /> Hotsite – Links</h1>
          <p>Configure os links exibidos na página do hotsite</p>
        </div>
      </div>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="editor-content">
        {links.map(link => {
          const hint = LINK_HINTS[link.label] ?? {
            placeholder: 'https://exemplo.com',
            hint: 'Insira a URL completa',
          };

          return (
            <div key={link.id} className="form-section">
              <h3>{link.label}</h3>

              <div className="form-field">
                <label>URL</label>
                <input
                  type="text"
                  value={link.url || ''}
                  placeholder={hint.placeholder}
                  onChange={e => handleChange(link.id, 'url', e.target.value)}
                />
                <small>{hint.hint}</small>
              </div>

              <div className="form-field">
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={!!link.is_active}
                    onChange={e => handleChange(link.id, 'is_active', e.target.checked)}
                    style={{ width: 'auto', accentColor: '#475569' }}
                  />
                  Exibir este link no hotsite
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div className="form-actions">
        <button
          className="btn-primary"
          onClick={handleSaveAll}
          disabled={saving}
        >
          <Save size={16} />
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}

export default HotsiteEditor;
