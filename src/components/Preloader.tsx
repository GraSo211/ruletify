import "./Preloader.css"
export default function Preloader() {
  return (
    <>
      <div className="div div1 animateUp lg:text-5xl xl:text-6xl 2xl:text-7xl hidden xl:grid" id="preloader-1">
        <span className="span block p-2 bg-white">
          <span className="block bg-[#121317] p-3">
            <h1>RULETIFY</h1>
          </span>
        </span>
      </div>
      <div className="div div2 animateDown lg:text-5xl xl:text-6xl 2xl:text-7xl hidden xl:grid " id="preloader-2">
        <span className="span block p-2 bg-white">
          <span className="block bg-[#121317] p-3">
            <h1>RULETIFY</h1>
          </span>
        </span>
      </div>
    </>
  );
}
