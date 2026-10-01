type BotonAccionProps = {
  texto: string
  color: string
  onPress: () => void
  ariaLabel?: string
  disabled?: boolean
  className?: string
}

export function BotonAccion({ texto, color, onPress, ariaLabel, disabled = false, className }: BotonAccionProps) {
  return (
    <button type="button" className={className} style={{ backgroundColor: color, opacity: disabled ? 0.4 : 1 }} 
      onClick={onPress} aria-label={ariaLabel} disabled={disabled}>
      {texto}
    </button>
  )
}
