const Spinner = ({theme, size}) => {
  return (
    <div className="spinner">
      <div className={`spinner__container spinner__container_size_${size}`}>
        <div className={`spinner__wheel spinner__wheel_theme_${theme} spinner__wheel_size_${size}`}>
        </div>
      </div>
    </div>
  );
};

export default Spinner;