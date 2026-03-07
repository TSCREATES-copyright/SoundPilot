function Spinner({ className = '' }) {
  return <span className={`loading-spinner ${className}`.trim()} aria-label="Loading" />
}

export default Spinner
