import "./Preloader.css"
export default function Preloader() {
  return (
    <>
      <div className="div div1 animateUp hd:text-7xl full-hd:text-8xl 2k:text-9xl hidden hd:grid" id="preloader-1">
        <span className="span block p-2 bg-white">
          <span className="block bg-[#121317] p-3">
            <h1>RULETIFY</h1>
          </span>
        </span>
      </div>
      <div className="div div2 animateDown hd:text-7xl full-hd:text-8xl 2k:text-9xl hidden hd:grid " id="preloader-2">
        <span className="span block p-2 bg-white">
          <span className="block bg-[#121317] p-3">
            <h1>RULETIFY</h1>
          </span>
        </span>
      </div>
    </>
  );
}
