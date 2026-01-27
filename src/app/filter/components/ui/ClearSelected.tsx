type ClearSelectedProps = { onClear: () => void };

export default function ClearSelected({
  onClear,
}: Readonly<ClearSelectedProps>) {
  return (
    <button className="backBtn" type="button" onClick={onClear}>
      <span className="textBtn">Limpar</span>
    </button>
  );
}
