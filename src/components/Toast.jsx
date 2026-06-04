import { useApp } from '../context/AppContext.jsx';

export default function Toast() {
  const { toast, setToast } = useApp();
  if (!toast) return null;

  return (
    <div className="toast-wrap" aria-live="polite" aria-atomic="true">
      <div className={`toast-cp ${toast.type === 'error' ? 'error' : ''}`} role="status">
        <span className="toast-ico">{toast.type === 'error' ? '⚠️' : '✅'}</span>
        <div className="flex-grow-1" style={{ fontSize: 14, fontWeight: 600, color: '#10221a' }}>
          {toast.message}
        </div>
        <button
          type="button"
          onClick={() => setToast(null)}
          aria-label="Fechar notificação"
          style={{ background: 'transparent', border: 'none', color: '#748a80', fontSize: 18, cursor: 'pointer' }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
