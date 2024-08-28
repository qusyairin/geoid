import '../style.css';

function ResultButton({ onClose, onButtonClick }) {
  return (
    <div className="button-container">
      <div className="button-set">
        <button className="btn-model" onClick={() => onButtonClick('model')}>Model</button>
        <button className="btn-multimedia" onClick={() => onButtonClick('multimedia')}>Multimedia</button>
        <button className="btn-reports" onClick={() => onButtonClick('reports')}>Reports</button>
      </div>
      <button className="btn-close" onClick={onClose}>Close Result Page</button>
    </div>
  );
}

export default ResultButton;
