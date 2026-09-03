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
          <kbd>Space</kbd>
        </dt>
        <dd>Play / Pause Backing Track</dd>
        <dt>
          <kbd>n</kbd>
        </dt>
        <dd>Toggle Anglo-saxon / Solfege notation</dd>
        <dt>
          <kbd>e</kbd>
        </dt>
        <dd>Switch Enharmonics (for F# and C#)</dd>
        <dt>
          <kbd>r</kbd>
        </dt>
        <dd>Reverse Current Sequence</dd>
        <dt>
          <kbd>2</kbd>
        </dt>
        <dd>Toggle Degree 2</dd>
        <dt>
          <kbd>5</kbd>
        </dt>
        <dd>Toggle Degree 5</dd>
        <dt>
          <kbd>6</kbd>
        </dt>
        <dd>Toggle Degree 6</dd>
      </dl>
    </Modal>
  );
}
