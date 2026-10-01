import { BotonAccion } from './BotonAccion'

type PanelEquipoProps = {
  nombre: string
  puntos: number
  color: string
  ganando: boolean
  onAnotar: (puntos: number) => void
}

export function PanelEquipo({ nombre, puntos, color, ganando, onAnotar }: PanelEquipoProps) {
  return (
    <section className="team" style={{ borderColor: ganando ? color : 'transparent' }} aria-label={nombre}>
      <h2>{nombre}</h2>
      <p className="score" style={{ backgroundColor: color }} aria-live="polite" aria-atomic="true" aria-label={`${nombre}: ${puntos} puntos`}>
        {String(puntos).padStart(2, '0')}
      </p>
      <span className="points-label">PUNTOS</span>
      <div className="point-buttons">
        {[1, 2, 3].map((valor) => (
          <BotonAccion
            key={valor}
            texto={`+${valor}`}
            color={color}
            onPress={() => onAnotar(valor)}
            ariaLabel={`Sumar ${valor} ${valor === 1 ? 'punto' : 'puntos'} a ${nombre}`}
          />
        ))}
      </div>
    </section>
  )
}
