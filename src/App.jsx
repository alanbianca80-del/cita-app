import { useState } from "react";

const ACTIVIDADES = [
  {
    id: 1,
    emoji: "🎮",
    titulo: "Juegos + Comer",
    descripcion: "Un rato en los juegos y luego a comer algo rico juntos",
  },
  {
    id: 2,
    emoji: "🎉",
    titulo: "Desfile de Cantonización",
    descripcion: "Ver el desfile cívico del 3 de julio por la Av. Tsáchila — 58 años de Santo Domingo",
  },
  {
    id: 3,
    emoji: "🌳",
    titulo: "Parque Jelen Tenka",
    descripcion: "Una vuelta por el parque más grande y llamativo de Santo Domingo",
  },
  {
    id: 4,
    emoji: "🍖",
    titulo: "Parrillada / Comida típica",
    descripcion: "Probar la mejor parrilla de la ciudad — Santo Domingo es la Parrilla del Ecuador",
  },
];

const HORAS = ["12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00"];
const DIAS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

export default function App() {
  const [paso, setPaso] = useState("pregunta");
  const [noSize, setNoSize] = useState(100);
  const [diaLibre, setDiaLibre] = useState("");
  const [hora, setHora] = useState("");
  const [actividad, setActividad] = useState(null);
  const [guardado, setGuardado] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const handleNo = () => setNoSize((s) => Math.max(s * 0.72, 18));

  const confirmar = async () => {
    setGuardando(true);
    // Aquí puedes conectar tu API de MongoDB más adelante
    // Por ahora simula el guardado
    await new Promise(r => setTimeout(r, 800));
    setGuardando(false);
    setGuardado(true);
    setPaso("confirmado");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0720 0%, #1e0d3e 50%, #0f0720 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Partículas de fondo */}
      {["💖","✨","🌸","💕","⭐","🌺","💫","🎀"].map((e, i) => (
        <div key={i} style={{
          position: "fixed",
          fontSize: `${14 + (i % 3) * 6}px`,
          top: `${(i * 13) % 95}%`,
          left: `${(i * 17) % 95}%`,
          opacity: 0.12,
          pointerEvents: "none",
          animation: `float${i % 3} ${4 + i * 0.5}s ease-in-out infinite alternate`,
        }}>{e}</div>
      ))}

      <style>{`
        @keyframes float0 { to { transform: translateY(-12px) rotate(5deg); } }
        @keyframes float1 { to { transform: translateY(-18px) rotate(-5deg); } }
        @keyframes float2 { to { transform: translateY(-8px) rotate(3deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.06);} }
        @keyframes spin { to { transform: rotate(360deg); } }
        .card { animation: fadeUp 0.45s ease forwards; }
        .btn-si {
          background: linear-gradient(135deg, #e91e8c, #9b27af);
          color: white; border: none;
          padding: 14px 44px; border-radius: 50px;
          font-size: 18px; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 24px rgba(233,30,140,0.45);
          transition: all 0.2s; animation: pulse 2.2s infinite;
        }
        .btn-si:hover { transform: scale(1.09); box-shadow: 0 6px 32px rgba(233,30,140,0.65); }
        .btn-si:disabled { opacity: 0.45; animation: none; cursor: not-allowed; }
        .btn-no {
          background: rgba(255,255,255,0.09); color: rgba(255,255,255,0.75);
          border: 1.5px solid rgba(255,255,255,0.2); border-radius: 50px;
          cursor: pointer; transition: all 0.3s; white-space: nowrap;
          overflow: hidden;
        }
        .dia-btn {
          background: rgba(255,255,255,0.07);
          border: 2px solid rgba(255,255,255,0.18);
          color: white; padding: 9px 16px; border-radius: 10px;
          cursor: pointer; transition: all 0.2s; font-size: 14px;
        }
        .dia-btn:hover, .dia-btn.active { background: rgba(233,30,140,0.28); border-color: #e91e8c; }
        .act-btn {
          background: rgba(255,255,255,0.07);
          border: 2px solid rgba(255,255,255,0.15);
          color: white; padding: 14px 16px; border-radius: 14px;
          cursor: pointer; transition: all 0.2s; text-align: left; width: 100%;
        }
        .act-btn:hover, .act-btn.active { background: rgba(233,30,140,0.22); border-color: #e91e8c; }
        input[type=text] {
          background: rgba(255,255,255,0.09); border: 2px solid rgba(255,255,255,0.18);
          border-radius: 12px; color: white; padding: 12px 16px;
          font-size: 15px; width: 100%; box-sizing: border-box;
          outline: none; transition: border 0.2s;
        }
        input[type=text]:focus { border-color: #e91e8c; }
        input[type=text]::placeholder { color: rgba(255,255,255,0.35); }
        .loader { width:20px; height:20px; border:3px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation: spin 0.7s linear infinite; display:inline-block; }
      `}</style>

      <div className="card" style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(24px)",
        borderRadius: "28px",
        padding: "40px 32px",
        maxWidth: "410px",
        width: "100%",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        textAlign: "center",
      }}>

        {/* PASO 1 — ¿Quieres salir conmigo? */}
        {paso === "pregunta" && <>
          <div style={{ fontSize: "64px", marginBottom: "14px" }}>🌸</div>
          <h1 style={{ color: "white", fontSize: "24px", marginBottom: "10px", fontWeight: 800 }}>Hola 👋</h1>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "21px", marginBottom: "36px", lineHeight: 1.5 }}>
            ¿Quieres salir conmigo? 💖
          </p>
          <div style={{ display: "flex", gap: "18px", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <button className="btn-si" onClick={() => setPaso("viernes")}>✅ SÍ</button>
            <button
              className="btn-no"
              style={{ padding: `${noSize * 0.13}px ${noSize * 0.38}px`, fontSize: `${Math.max(noSize * 0.13, 7)}px` }}
              onClick={handleNo}
            >❌ NO</button>
          </div>
          {noSize < 70 && (
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "18px" }}>
              El NO se sigue encogiendo... 😏
            </p>
          )}
        </>}

        {/* PASO 2 — ¿Puede el viernes? */}
        {paso === "viernes" && <>
          <div style={{ fontSize: "58px", marginBottom: "14px" }}>🥹</div>
          <h2 style={{ color: "white", fontSize: "22px", marginBottom: "12px", fontWeight: 800 }}>¡Qué alegría! 🎉</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "18px", marginBottom: "32px", lineHeight: 1.5 }}>
            ¿Puedes el <strong style={{ color: "#e91e8c" }}>jueves 3 de julio</strong>?<br/>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Es feriado por la Cantonización 🎊</span>
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
            <button className="btn-si" onClick={() => { setDiaLibre("Jueves 3 de julio"); setPaso("hora"); }}>✅ SÍ</button>
            <button className="btn-no" style={{ padding: "13px 26px", fontSize: "15px" }} onClick={() => setPaso("queDia")}>❌ NO</button>
          </div>
        </>}

        {/* PASO 3 — ¿Qué día estás libre? */}
        {paso === "queDia" && <>
          <div style={{ fontSize: "50px", marginBottom: "12px" }}>📅</div>
          <h2 style={{ color: "white", fontSize: "20px", marginBottom: "6px", fontWeight: 800 }}>¿Qué día puedes? 😊</h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "18px" }}>Selecciona o escribe el día</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "14px" }}>
            {DIAS.map(d => (
              <button key={d} className={`dia-btn ${diaLibre === d ? "active" : ""}`} onClick={() => setDiaLibre(d)}>{d}</button>
            ))}
          </div>
          <input type="text" placeholder="O escribe otro día..." value={diaLibre} onChange={e => setDiaLibre(e.target.value)} style={{ marginBottom: "20px" }} />
          <button className="btn-si" disabled={!diaLibre} onClick={() => diaLibre && setPaso("hora")} style={{ opacity: diaLibre ? 1 : 0.45 }}>
            Continuar →
          </button>
        </>}

        {/* PASO 4 — Hora */}
        {paso === "hora" && <>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>🕐</div>
          <h2 style={{ color: "white", fontSize: "20px", marginBottom: "4px", fontWeight: 800 }}>¿A qué hora? ⏰</h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "16px" }}>{diaLibre}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "22px", maxHeight: "170px", overflowY: "auto" }}>
            {HORAS.map(h => (
              <button key={h} className={`dia-btn ${hora === h ? "active" : ""}`} onClick={() => setHora(h)}>{h}</button>
            ))}
          </div>
          <button className="btn-si" disabled={!hora} onClick={() => hora && setPaso("actividad")} style={{ opacity: hora ? 1 : 0.45 }}>
            Continuar →
          </button>
        </>}

        {/* PASO 5 — ¿Qué hacemos? */}
        {paso === "actividad" && <>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>🎉</div>
          <h2 style={{ color: "white", fontSize: "20px", marginBottom: "4px", fontWeight: 800 }}>¿Qué hacemos?</h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "16px" }}>
            {diaLibre} · {hora}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "22px" }}>
            {ACTIVIDADES.map(a => (
              <button key={a.id} className={`act-btn ${actividad?.id === a.id ? "active" : ""}`} onClick={() => setActividad(a)}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span style={{ fontSize: "26px", flexShrink: 0 }}>{a.emoji}</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 700, fontSize: "15px" }}>{a.titulo}</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "3px" }}>{a.descripcion}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <button className="btn-si" disabled={!actividad || guardando} onClick={confirmar} style={{ opacity: actividad ? 1 : 0.45 }}>
            {guardando ? <span className="loader" /> : "¡Confirmar! 🎊"}
          </button>
        </>}

        {/* PASO 6 — Confirmado */}
        {paso === "confirmado" && <>
          <div style={{ fontSize: "72px", marginBottom: "14px", animation: "pulse 1s infinite" }}>🎊</div>
          <h2 style={{ color: "#e91e8c", fontSize: "26px", marginBottom: "16px", fontWeight: 900 }}>¡Todo listo!</h2>
          <div style={{
            background: "rgba(233,30,140,0.13)",
            border: "1.5px solid rgba(233,30,140,0.35)",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "18px",
            textAlign: "left",
          }}>
            <p style={{ color: "white", fontSize: "16px", margin: "8px 0" }}>📅 <strong>{diaLibre}</strong></p>
            <p style={{ color: "white", fontSize: "16px", margin: "8px 0" }}>🕐 <strong>{hora}</strong></p>
            <p style={{ color: "white", fontSize: "16px", margin: "8px 0" }}>{actividad?.emoji} <strong>{actividad?.titulo}</strong></p>
          </div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px" }}>¡Va a ser una tarde increíble! 💖</p>
          {guardado && <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", marginTop: "12px" }}>✓ Respuesta guardada</p>}
        </>}

      </div>
    </div>
  );
}
