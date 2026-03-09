import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";

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
      <div className="flex flex-col gap-24">

        {/* HERO SECTION */}

        <section className="relative grid md:grid-cols-2 gap-10 items-center">

          <div>
            <span className="bg-primary-600/20 text-primary-300 px-3 py-1 rounded-full text-xs">
              Student Management System
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-white leading-tight">
              Manage Student Records  
              <span className="text-primary-400"> Easily & Efficiently</span>
            </h1>

            <p className="mt-5 text-slate-300 max-w-lg">
              A simple yet powerful dashboard to manage student information
              including CRUD operations, search, pagination and Excel export.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-primary-600 hover:bg-primary-500 px-6 py-2 rounded-lg text-white font-medium"
              >
                Get Started
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border border-slate-600 px-6 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
              >
                Explore Features
              </button>
            </div>
          </div>

          {/* IMAGE CAROUSEL */}

          <div className="relative h-[320px] rounded-xl overflow-hidden shadow-lg">
            {bannerSlides.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === slide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STATS SECTION */}

        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="glass-card p-6">
            <h3 className="text-3xl font-bold text-white">100+</h3>
            <p className="text-slate-400 text-sm">Students Managed</p>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-3xl font-bold text-white">4</h3>
            <p className="text-slate-400 text-sm">Core Features</p>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-3xl font-bold text-white">1s</h3>
            <p className="text-slate-400 text-sm">Fast CRUD Actions</p>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-3xl font-bold text-white">Excel</h3>
            <p className="text-slate-400 text-sm">Export Support</p>
          </div>
        </section>

        {/* FEATURES */}

        <section id="features" className="text-center">
          <h2 className="text-3xl font-bold text-white">
            Core Features
          </h2>

          <p className="text-slate-400 mt-2">
            Everything you need to manage students efficiently
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-10">

            <div className="glass-card p-6">
              <h3 className="text-white font-semibold">➕ Add Students</h3>
              <p className="text-slate-400 text-sm mt-2">
                Add new students with validation.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-white font-semibold">✏ Edit Data</h3>
              <p className="text-slate-400 text-sm mt-2">
                Update student information quickly.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-white font-semibold">🗑 Delete Students</h3>
              <p className="text-slate-400 text-sm mt-2">
                Confirmation dialogs ensure safe deletion.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-white font-semibold">📥 Excel Export</h3>
              <p className="text-slate-400 text-sm mt-2">
                Download full or filtered data instantly.
              </p>
            </div>

          </div>
        </section>

        {/* WORKFLOW */}

        <section className="grid md:grid-cols-4 gap-6 text-center">

          <div className="glass-card p-6">
            <h3 className="text-white font-semibold">1️⃣ Add Student</h3>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-white font-semibold">2️⃣ View Table</h3>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-white font-semibold">3️⃣ Edit Details</h3>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-white font-semibold">4️⃣ Export Data</h3>
          </div>

        </section>

        {/* ABOUT */}

        <section className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl font-bold text-white">
              About This Project
            </h2>

            <p className="text-slate-300 mt-4">
              This Student Management System demonstrates frontend CRUD
              functionality using React. The application allows administrators
              to add, edit, delete and export student records while maintaining
              a clean and responsive UI.
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-white font-semibold mb-3">
              Technology Stack
            </h3>

            <div className="flex flex-wrap gap-2">
              <span className="badge">React</span>
              <span className="badge">TailwindCSS</span>
              <span className="badge">JavaScript</span>
              <span className="badge">Excel Export</span>
            </div>
          </div>

        </section>

        {/* CTA */}

        <section className="text-center glass-card p-10">

          <h2 className="text-3xl font-bold text-white">
            Start Managing Students Today
          </h2>

          <p className="text-slate-400 mt-3">
            Organize student records and simplify administration.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 bg-primary-600 hover:bg-primary-500 px-8 py-3 rounded-lg text-white"
          >
            Go To Dashboard
          </button>

        </section>

      </div>
    </Layout>
  );
};