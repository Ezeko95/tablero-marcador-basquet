import { useState } from 'react'
import { PanelEquipo } from './components/PanelEquipo'
import { BotonAccion } from './components/BotonAccion'
import type { Equipo, Jugada } from './types'
import './App.css'

function App() {
  const [puntajeLocal, setPuntajeLocal] = useState(0)
  const [puntajeVisitante, setPuntajeVisitante] = useState(0)
  const [jugadas, setJugadas] = useState<Jugada[]>([])
  const ultimasJugadas = jugadas.slice(-5).reverse()

  const ganaLocal = puntajeLocal > puntajeVisitante
  const ganaVisitante = puntajeVisitante > puntajeLocal
  const diferencia = Math.abs(puntajeLocal - puntajeVisitante)
  const marcadorEnCero = puntajeLocal === 0 && puntajeVisitante === 0
  const leyenda = ganaLocal
    ? `Gana Local por ${diferencia}`
    : ganaVisitante
      ? `Gana Visitante por ${diferencia}`
      : 'Empate'

  const actualizarPuntaje = (equipo: Equipo, puntos: number) => {
    if (equipo === 'local') {
      setPuntajeLocal((prev) => prev + puntos)
    } else {
      setPuntajeVisitante((prev) => prev + puntos)
    }
  }

  const anotar = (equipo: Equipo, puntos: number) => {
    actualizarPuntaje(equipo, puntos)
    setJugadas((prev) => [...prev, { equipo, puntos }])
  }

  const deshacer = () => {
    const ultimaJugada = jugadas.at(-1)
    if (!ultimaJugada) return

    actualizarPuntaje(ultimaJugada.equipo, -ultimaJugada.puntos)
    setJugadas((prev) => prev.slice(0, -1))
  }

  const nuevoPartido = () => {
    setPuntajeLocal(0)
    setPuntajeVisitante(0)
    setJugadas([])
  }

  return (
    <main className="app">
      <header className="heading">
        <span className="eyebrow">EN LA CANCHA</span>
        <h1>Marcador de básquet<span>.</span></h1>
        <p>Cada punto cuenta. Llevá el partido jugada a jugada.</p>
      </header>
      <section className="scoreboard" aria-label="Marcador del partido">
        <div className="board-header"><span className="live-dot" /> DOS EQUIPOS · UN PARTIDO</div>
        <div className="teams">
          <PanelEquipo nombre="Local" puntos={puntajeLocal} color="#c5e87a" ganando={ganaLocal} onAnotar={(p) => anotar('local', p)} />
          <span className="versus" aria-hidden="true">VS</span>
          <PanelEquipo nombre="Visitante" puntos={puntajeVisitante} color="#f4bb82" ganando={ganaVisitante} onAnotar={(p) => anotar('visitante', p)} />
        </div>
        <p className="result" role="status">{leyenda}</p>
        <footer className="board-footer">
          <span>Sumá 1, 2 o 3 puntos por jugada</span>
          <BotonAccion texto="↺ Nuevo partido" color="transparent" className="reset-button" onPress={nuevoPartido} disabled={marcadorEnCero} />
        </footer>
      </section>
      <section className="history" aria-labelledby="history-title">
        <div className="history-header">
          <h2 id="history-title">Últimas 5 jugadas</h2>
          <BotonAccion texto="↶ Deshacer" color="transparent" className="reset-button" onPress={deshacer} disabled={jugadas.length === 0} />
        </div>
        {ultimasJugadas.length === 0 ? (
          <p className="history-empty">Todavía no hay jugadas.</p>
        ) : (
          <ol className="history-list" aria-label="Jugadas, de más reciente a más antigua">
            {ultimasJugadas.map((jugada, indice) => (
              <li key={jugadas.length - 1 - indice}>
                <span>{jugada.equipo === 'local' ? 'Local' : 'Visitante'}</span>
                <strong style={{ color: jugada.equipo === 'local' ? '#c5e87a' : '#f4bb82' }}>+{jugada.puntos}</strong>
              </li>
            ))}
          </ol>
        )}
      </section>
      <p className="footnote">BÁSQUET · EL JUEGO SIGUE</p>
    </main>
  )
}

export default App
