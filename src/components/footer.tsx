export function Footer() {
  return (
    <footer
      className="bg-ink font-mono uppercase text-paper"
      style={{
        padding: "30px 0",
        fontSize: "11px",
        letterSpacing: "0.18em",
      }}
    >
      <div className="wrap flex flex-wrap justify-between gap-6">
        <div>
          © <span className="text-pink">MMXXVI</span> · K. Ghode
        </div>
        <div>
          Set in <span className="text-pink">Space Grotesk</span> &amp;{" "}
          <span className="text-blue">JetBrains Mono</span>
        </div>
        <div>
          Riso edition · <span className="text-pink">2-color</span> + grain
        </div>
        <div>
          Vol. <span className="text-blue">IV</span> · No. 04
        </div>
      </div>
    </footer>
  );
}
