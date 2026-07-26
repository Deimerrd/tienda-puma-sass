function MenuButton({ icono, titulo, activo, onClick }) {
  return (
    <button
      className={`menu-button ${activo ? "activo" : ""}`}
      onClick={onClick}
    >
      <span>{icono}</span>

      <span>{titulo}</span>
    </button>
  );
}

export default MenuButton;
