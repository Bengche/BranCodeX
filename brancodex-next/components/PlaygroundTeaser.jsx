export default function PlaygroundTeaser() {
  return (
    <section className="text-white py-20 px-6 playground" id="playground">
      <div className="max-w-5xl mx-auto text-center" data-aos="zoom-in">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Welcome to the Playground 🎮</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-10 leading-relaxed">
          Dive into the world of creativity and fun! Here you&#39;ll find interactive <span className="text-yellow-400 font-semibold">quizzes</span>, clever <span className="text-yellow-400 font-semibold">coding challenges</span>, fun <span className="text-yellow-400 font-semibold">games</span>, random <span className="text-yellow-400 font-semibold">developer jokes</span>, and a live playground where you can write and run <span className="text-yellow-400 font-semibold">HTML, CSS &amp; JavaScript</span> code instantly, you can even build another website inside this website 😉. Whether you&#39;re here to hire, learn, laugh, or test your skills - you&#39;re in the right place!
        </p>
        <a href="/playground" className="inline-block mt-6 px-8 py-4 text-lg font-semibold bg-yellow-400 text-black hover:bg-yellow-500 transition-all rounded-full shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300">
          Take Me There
        </a>
      </div>
    </section>
  );
}
