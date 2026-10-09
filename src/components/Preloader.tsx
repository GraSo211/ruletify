import "./Preloader.css"

export default function Preloader() {
  return (
    <>
      <div className="preloader-pane div1 animateUp lg:text-5xl xl:text-6xl 2xl:text-7xl hidden xl:grid" id="preloader-1">
        <span className="preloader-frame block p-2">
          <span className="block bg-night-900 p-6">
            <h1 className="preloader-title font-display text-6xl xl:text-7xl 2xl:text-8xl tracking-[0.12em]">RULETIFY</h1>
          </span>
        </span>
      </div>
      <div className="preloader-pane div2 animateDown lg:text-5xl xl:text-6xl 2xl:text-7xl hidden xl:grid" id="preloader-2">
        <span className="preloader-frame block p-2">
          <span className="block bg-night-900 p-6">
            <h1 className="preloader-title font-display text-6xl xl:text-7xl 2xl:text-8xl tracking-[0.12em]">RULETIFY</h1>
          </span>
        </span>
      </div>
    </>
  );
}
