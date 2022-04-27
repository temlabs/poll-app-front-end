export default function LoadingPoll(): JSX.Element {
  return (
    <>
      <section className="flex-container-column centre-children centre-children-vertically loading-section">
        <h2 className="pulse-animation loading-text">
          We're creating your poll, <br /> hang tight!
        </h2>
        <div className="flex-container-row loading-squares-container">
          <span className="circle">&nbsp;</span>
          <span className="circle">&nbsp;</span>
          <span className="circle">&nbsp;</span>
        </div>
      </section>
    </>
  );
}
