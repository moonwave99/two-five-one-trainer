import Modal from "./Modal";

export default function Shortcuts({ showShortcuts, setShowShortcuts }) {
  return (
    <Modal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)}>
      <h2>Shortcuts</h2>
      <dl>
        <dt>
          <kbd>s</kbd>
        </dt>
        <dd>Toggle Settings Panel</dd>
        <dt>
          <kbd>z</kbd>
        </dt>
        <dd>Toggle Zen Mode</dd>
        <dt>
          <kbd>p</kbd>
        </dt>
        <dd>Play / Pause Backing Track</dd>
        <dt>
          <kbd>e</kbd>
        </dt>
        <dd>Switch Enharmonics (for F# and C#)</dd>
        <dt>
          <kbd>r</kbd>
        </dt>
        <dd>Reverse sequence</dd>
        <dt>
          <kbd>2</kbd>
        </dt>
        <dd>Toggle degree 2</dd>
        <dt>
          <kbd>5</kbd>
        </dt>
        <dd>Toggle degree 5</dd>
        <dt>
          <kbd>6</kbd>
        </dt>
        <dd>Toggle degree 6</dd>
      </dl>
    </Modal>
  );
}
