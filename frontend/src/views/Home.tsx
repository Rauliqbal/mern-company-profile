import { ArrowRight, Code2, Github, Instagram, Linkedin, Megaphone, Palette, Smartphone } from "lucide-react";

export default function Home() {
  const services = [
    {
      title: "Web Developer",
      desc: "Bikin website portofolio atau tugas akhir yang responsif dan kencang.",
      icon: <Code2 className="w-8 h-8 text-blue-500" />,
      tag: "Next.js / React"
    },
    {
      title: "App Developer",
      desc: "Ubah ide startup kamu jadi aplikasi mobile yang fungsional.",
      icon: <Smartphone className="w-8 h-8 text-purple-500" />,
      tag: "Flutter / React Native"
    },
    {
      title: "UI/UX Designer",
      desc: "Desain interface yang estetik dan nyaman dipake user.",
      icon: <Palette className="w-8 h-8 text-pink-500" />,
      tag: "Figma / Adobe XD"
    },
    {
      title: "Digital Marketing",
      desc: "Naikin visibility project atau bisnismu di medsos.",
      icon: <Megaphone className="w-8 h-8 text-orange-500" />,
      tag: "Ads / SEO"
    }
  ];
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">Studio<span className="text-blue-600">Kreatif.</span></div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all">
            Mulai Project
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 tracking-wide">
            SOLUSI DIGITAL MAHASISWA
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
            Wujudkan Ide Digitalmu <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Tanpa Ribet.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Bantu kamu nyelesain project kuliah, tugas akhir, atau bangun startup impian dengan tech stack modern dan desain kekinian.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-blue-200 transition-all flex items-center justify-center gap-2 group">
              Konsultasi Gratis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              Lihat Portofolio
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Layanan Kami</h2>
            <p className="text-slate-500">Apapun kebutuhan digitalmu, kami siap eksekusi.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-blue-100 hover:bg-white transition-all group">
                <div className="mb-6 p-3 bg-white w-fit rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {s.desc}
                </p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full">
                  {s.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer id="contact" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Siap bikin sesuatu yang keren?</h2>
            <p className="text-slate-400">Hubungi kami via WhatsApp atau DM Instagram.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="p-4 bg-slate-800 rounded-2xl hover:bg-blue-600 transition-colors"><Instagram /></a>
            <a href="#" className="p-4 bg-slate-800 rounded-2xl hover:bg-blue-600 transition-colors"><Linkedin /></a>
            <a href="#" className="p-4 bg-slate-800 rounded-2xl hover:bg-blue-600 transition-colors"><Github /></a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; 2024 StudioKreatif. Dibuat dengan ❤️ untuk Mahasiswa.
        </div>
      </footer>
    </div>
  )
}
