import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import {
  Users,
  Layers,
  Zap,
  FileSpreadsheet,
  UserPlus,
  Edit3,
  Trash2,
  Download,
  List,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const bannerSlides = [
  {
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    title: "Manage Students Efficiently",
    subtitle: "A clean dashboard to organize student data."
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Powerful CRUD Operations",
    subtitle: "Add, edit, and delete students easily."
  },
  {
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    title: "Search & Pagination",
    subtitle: "Quickly find students with filters."
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    title: "Excel Export",
    subtitle: "Download full or filtered data instantly."
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    title: "Modern React Dashboard",
    subtitle: "Built with React, Tailwind and modern UI."
  }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-24 py-8">

        {/* HERO SECTION */}

        <section className="relative pt-12 pb-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white rounded-3xl"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-8 uppercase tracking-wider shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Student Management System 2.0
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[4.2rem] font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6">
                Manage Students <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Easily & Efficiently
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 font-normal leading-relaxed mb-10 max-w-lg">
                A simple yet powerful dashboard to manage everything from CRUD operations and search, to pagination and instant Excel exports.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="group inline-flex items-center justify-center gap-3 bg-black hover:bg-slate-800 px-8 py-4 rounded-xl text-white text-lg font-semibold transition-all shadow-xl shadow-slate-200 hover:-translate-y-0.5 active:scale-95"
                >
                  Get Started <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-200 px-8 py-4 rounded-xl text-slate-700 text-lg font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95"
                >
                  Explore Features
                </button>
              </div>
            </div>

            {/* IMAGE CAROUSEL (Premium Window Mockup) */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-200 to-indigo-100 rounded-[2rem] blur-2xl opacity-60"></div>
              
              <div className="relative rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden shadow-slate-200/50">
                {/* Browser/Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                   <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                
                {/* Carousel Content */}
                <div className="relative h-[400px] w-full bg-slate-100">
                  {bannerSlides.map((item, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === slide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                      <img
                        src={item.image}
                        className="w-full h-full object-cover object-center"
                        alt={item.title}
                      />
                      
                      {/* Subdued overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent flex flex-col justify-end p-8">
                        <h3 
                          className="text-2xl font-bold text-white mb-2"
                          style={{
                            opacity: index === slide ? 1 : 0, 
                            transform: index === slide ? 'translateY(0)' : 'translateY(10px)',
                            transition: 'all 700ms ease 300ms'
                          }}
                        >
                          {item.title}
                        </h3>
                        <p 
                          className="text-slate-200 text-base font-medium" 
                          style={{
                            opacity: index === slide ? 1 : 0, 
                            transition: 'opacity 700ms ease 500ms'
                          }}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* STATS SECTION */}

        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="glass-card p-6 flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-900">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">100+</h3>
            <p className="text-slate-500 text-sm font-medium mt-1">Students Managed</p>
          </div>

          <div className="glass-card p-6 flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-900">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">4</h3>
            <p className="text-slate-500 text-sm font-medium mt-1">Core Features</p>
          </div>

          <div className="glass-card p-6 flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-900">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">1s</h3>
            <p className="text-slate-500 text-sm font-medium mt-1">Fast CRUD Actions</p>
          </div>

          <div className="glass-card p-6 flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-900">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">Excel</h3>
            <p className="text-slate-500 text-sm font-medium mt-1">Export Support</p>
          </div>
        </section>

        {/* FEATURES */}

        <section id="features" className="text-center pt-10">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold tracking-widest uppercase">
            <Zap className="w-4 h-4 text-amber-500" />
            Capabilities
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Core Features
          </h2>

          <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto font-medium">
            Everything you need to manage students efficiently in one place.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-10">

            <div className="glass-card p-6 text-left">
              <UserPlus className="w-8 h-8 text-slate-900 mb-4" />
              <h3 className="text-slate-900 font-bold text-lg">Add Students</h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                Add new students securely with built-in form validation.
              </p>
            </div>

            <div className="glass-card p-6 text-left">
              <Edit3 className="w-8 h-8 text-slate-900 mb-4" />
              <h3 className="text-slate-900 font-bold text-lg">Edit Data</h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                Update student information quickly and easily in real-time.
              </p>
            </div>

            <div className="glass-card p-6 text-left">
              <Trash2 className="w-8 h-8 text-slate-900 mb-4" />
              <h3 className="text-slate-900 font-bold text-lg">Delete Students</h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                Safe deletion with required confirmation dialogs to prevent mistakes.
              </p>
            </div>

            <div className="glass-card p-6 text-left">
              <Download className="w-8 h-8 text-slate-900 mb-4" />
              <h3 className="text-slate-900 font-bold text-lg">Excel Export</h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                Download full or filtered student data instantly to spreadsheet.
              </p>
            </div>

          </div>
        </section>

        <section className="pt-8">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-2 mb-4 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold tracking-widest uppercase">
              <Layers className="w-4 h-4 text-blue-500" />
              Process
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Simple Workflow
            </h2>

            <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto font-medium">
              Manage your student roster in four simple steps without any friction.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">

          <div className="glass-card p-6 flex flex-col items-center">
            <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm mb-3">1</span>
            <UserPlus className="w-6 h-6 text-slate-500 mb-2" />
            <h3 className="text-slate-900 font-bold">Add Student</h3>
          </div>

          <div className="glass-card p-6 flex flex-col items-center">
            <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm mb-3">2</span>
            <List className="w-6 h-6 text-slate-500 mb-2" />
            <h3 className="text-slate-900 font-bold">View Table</h3>
          </div>

          <div className="glass-card p-6 flex flex-col items-center">
            <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm mb-3">3</span>
            <Edit3 className="w-6 h-6 text-slate-500 mb-2" />
            <h3 className="text-slate-900 font-bold">Edit Details</h3>
          </div>

            <div className="glass-card p-6 flex flex-col items-center">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm mb-3">4</span>
              <Download className="w-6 h-6 text-slate-500 mb-2" />
              <h3 className="text-slate-900 font-bold">Export Data</h3>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};