
const IMG_EXT = 'png';
const ICON_BASE = '/assets/icons';

const EMOJI_TO_NAME = {
  '🧭': 'bussola', '🎯': 'alvo', '🏆': 'trofeu', '🌱': 'broto',
  '🥗': 'salada', '🏃': 'corrida', '🧘': 'lotus', '💧': 'gota',
  '❤️': 'coracao', '✨': 'brilho', '🚶': 'caminhada', '😴': 'sono',
  '🌬️': 'respiracao', '👟': 'tenis', '🧠': 'cerebro', '⚡': 'raio',
  '🌅': 'nascer-do-sol', '👣': 'pegadas', '🚪': 'porta', '🔁': 'atualizar',
  '📡': 'sinal', '🔥': 'chama', '🌟': 'estrela', '👑': 'coroa',
  '🦸': 'capa', '🩺': 'estetoscopio', '💊': 'comprimido', '💆': 'spa',
  '🔑': 'chave', '🛰️': 'satelite', '🤝': 'aperto-de-mao', '☁️': 'nuvem',
  '📈': 'grafico', '📦': 'caixa', '🔎': 'busca', '🔐': 'cadeado',
  '🔒': 'cadeado', '🔕': 'sino-desligado', '🗑️': 'lixeira', '🛑': 'parar',
  '⚛️': 'react', '✍️': 'editar', '✏️': 'editar', '♿': 'acessibilidade',
  
};

function resolveName(name) {
  if (!name) return null;
  return EMOJI_TO_NAME[name] || name;
}

/**
 * Ícone como imagem.
 *
 * @param {string} name      Nome do arquivo (sem extensão) ou emoji legado
 * @param {number} [size= 40] Largura/altura em pixels
 * @param {string} [className]
 * @param {string} [title]   Texto acessível (alt / aria-label)
 * @param {object} [style]   Estilos extras opcionais
 */
export default function Icon({ name, size = 40, className = '', title, style = {} }) {
  const resolved = resolveName(name);
  if (!resolved) return null;

  const src = `${ICON_BASE}/${resolved}.${IMG_EXT}`;

  return (
    <img
      src={src}
      width={size=32}
      height={size=32}
      alt={title || resolved}
      className={`cp-icon ${className}`}
      loading="lazy"
      draggable={false}
      style={{
        display: 'inline-block',
        width: size=32,
        height: size=32,
        objectFit: 'contain',
        verticalAlign: 'middle',
        ...style,
      }}
     
      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
    />
  );
}
