"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";

// Animation Variants
const fadeInUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const textReveal: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1, ease: "easeOut" }
  }
};

// Reusable Components
const Reveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Music Player Component
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/music/spongecola--piano-cover-by-gerard-chua.mp3");
    audioRef.current.loop = true;
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button 
      onClick={togglePlay}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-gold/50 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all duration-300 group"
    >
      {isPlaying ? (
        <div className="flex gap-1 h-4 items-end">
           <motion.div animate={{ height: [4, 16, 8, 12] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-current" />
           <motion.div animate={{ height: [12, 4, 16, 8] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-1 bg-current" />
           <motion.div animate={{ height: [8, 12, 4, 16] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-1 bg-current" />
        </div>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg>
      )}
    </button>
  );
};

// Countdown Component
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countDownDate = new Date("Apr 11, 2026 14:30:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="flex justify-center gap-8 md:gap-16 text-center py-20 bg-white text-black border-y luxury-border relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/20 to-transparent pointer-events-none" />
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ].map((item, i) => (
        <motion.div 
          key={item.label} 
          className="flex flex-col items-center z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.8 }}
        >
          <span className="text-4xl md:text-6xl font-light font-display text-gold tabular-nums">
            {item.value}
          </span>
          <span className="text-xs md:text-sm uppercase tracking-widest mt-2 text-gray-500">
            {item.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Love Story Component
const LoveStory = () => {
  const stories = [
    {
      year: "2018",
      title: "The First Meeting",
      desc: "It was a chance encounter at a coffee shop in Makati. Jastine was reading her favorite book, and Leronard couldn't help but ask about it. One conversation turned into hours of laughter.",
      img: "/wedding-shoot/643013995_1241539467523572_2155052829853528873_n.jpg"
    },
    {
      year: "2021",
      title: "The Proposal",
      desc: "Under the starlit sky of El Nido, Leronard got down on one knee. With the sound of waves crashing gently in the background, he asked the most important question of his life.",
      img: "/wedding-shoot/643558320_3527729307365666_4577884895516382260_n.jpg"
    },
    {
      year: "2026",
      title: "The Beginning of Forever",
      desc: "After years of building dreams together, we are finally tying the knot. We can't wait to start this new chapter as husband and wife, surrounded by our loved ones.",
      img: "/wedding-shoot/644063745_1209509667835568_4084062557698984477_n.jpg"
    }
  ];

  const [activeStory, setActiveStory] = useState(0);

  return (
    <section className="py-32 bg-stone-50 text-black relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
       
  
    </section>
  );
};

// Venues Component
const Venues = () => {
  const [selectedMap, setSelectedMap] = useState<string | null>(null);

  const venues = [
    {
      type: "Ceremony",
      name: "Diocesan Shrine and Parish of St. Mary Magdalene",
      location: "Imatong, Pililla, Rizal",
      time: "2:30 PM",
      desc: "Witness the exchange of vows in the historic and breathtaking interiors of San Agustin Church. A sacred union blessed by tradition and grace.",
      img: "/church.jpeg",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30904.62549157591!2d121.26864857431642!3d14.480199700000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397e98075d92cf1%3A0x39265c3afc0a3a94!2sDiocesan%20Shrine%20and%20Parish%20of%20St.%20Mary%20Magdalene%20-%20Imatong%2C%20Pililla%2C%20Rizal%20(Diocese%20of%20Antipolo)!5e0!3m2!1sen!2sph!4v1772542231596!5m2!1sen!2sph"
    },
    {
      type: "Reception",
      name: "Villa Lorenza Resort",
      location: "Manila East Rd, Pililla, Rizal",
      time: "4:30 PM",
      desc: "Celebrate the night away at Villa Lorenza Resort. Enjoy fine dining, cocktails, and music in a beautiful pavilion setting.",
      img: "/villa.jpeg",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.311368064531!2d121.31885108010239!3d14.46680164991574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397e92956384039%3A0xa7a3d2188cb4dcff!2sVilla%20Lorenza%20Resort!5e0!3m2!1sen!2sph!4v1772542206444!5m2!1sen!2sph"
    }
  ];

  return (
    <section className="py-32 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl mb-4">The Venues</h2>
          <p className="text-gold italic text-xl">Where the magic happens</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          {venues.map((venue, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden border-b-4 border-gold mb-8">
                <Image 
                  src={venue.img}
                  alt={venue.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-4xl font-display mb-2">{venue.type}</h3>
                  <p className="text-gold uppercase tracking-widest text-sm">{venue.time}</p>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl md:text-3xl font-display mb-4">{venue.name}</h4>
                <p className="text-gray-400 font-light leading-relaxed mb-6">
                  {venue.desc}
                </p>
                <button 
                  onClick={() => setSelectedMap(venue.mapUrl)}
                  className="inline-block text-gold uppercase tracking-widest text-xs border-b border-gold pb-1 hover:text-white hover:border-white transition-colors"
                >
                  View Map Location
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map Modal */}
      <AnimatePresence>
        {selectedMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedMap(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-black border border-gold/30 p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedMap(null)}
                className="absolute -top-12 right-0 text-white hover:text-gold transition-colors"
              >
                Close [X]
              </button>
              <div className="relative pt-[56.25%] w-full bg-zinc-900">
                <iframe 
                  src={selectedMap}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Gallery Component
const Gallery = () => {
  const images = [
    { src: "/wedding-shoot/641549971_25796609499961213_8639808257657264805_n.jpg", alt: "Jastine & Leronard Moment 1", span: "col-span-1 row-span-2" },
    { src: "/wedding-shoot/641591616_2111727506307981_7286134466114876972_n.jpg", alt: "Jastine & Leronard Moment 2", span: "col-span-1 row-span-1" },
    { src: "/wedding-shoot/641640809_2364426047389792_7909241252360473011_n.jpg", alt: "Jastine & Leronard Moment 3", span: "col-span-1 row-span-1" },
    { src: "/wedding-shoot/642103588_1398922661547290_4702766520108614786_n.jpg", alt: "Jastine & Leronard Moment 4", span: "col-span-2 row-span-1" },
    { src: "/wedding-shoot/642230157_1233584802174874_2340478983255891141_n.jpg", alt: "Jastine & Leronard Moment 5", span: "col-span-1 row-span-1" },
    { src: "/wedding-shoot/642961647_1397970302085017_2005132452631351863_n.jpg", alt: "Jastine & Leronard Moment 6", span: "col-span-1 row-span-2" },
    { src: "/wedding-shoot/643013995_1241539467523572_2155052829853528873_n.jpg", alt: "Jastine & Leronard Moment 7", span: "col-span-1 row-span-1" },
    { src: "/wedding-shoot/643558320_3527729307365666_4577884895516382260_n.jpg", alt: "Jastine & Leronard Moment 8", span: "col-span-1 row-span-1" },
    { src: "/wedding-shoot/644063745_1209509667835568_4084062557698984477_n.jpg", alt: "Jastine & Leronard Moment 9", span: "col-span-2 row-span-1" },
    { src: "/wedding-shoot/644231006_759220623655508_5739970447042265428_n.jpg", alt: "Jastine & Leronard Moment 10", span: "col-span-1 row-span-1" },
    { src: "/wedding-shoot/645011135_1446707233904604_2074592296150955005_n.jpg", alt: "Jastine & Leronard Moment 11", span: "col-span-1 row-span-1" },
    { src: "/wedding-shoot/646322694_710176332088676_5761652165718641117_n.jpg", alt: "Jastine & Leronard Moment 12", span: "col-span-1 row-span-1" },
  ];

  return (
    <section className="py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl text-gold">Our Moments</h2>
          <p className="text-gray-500 uppercase tracking-widest text-sm">Captured in time</p>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {images.map((img, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative group overflow-hidden ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Entourage = () => {
  const principalSponsors = [
    "Chief. Engr. Danilo Madali & Mrs. Metoshiela Madali",
    "Mr. Arnold Indemne & Mrs. Dinah Miranda",
    "Mr. Neil Aligam & Mrs. Lulu Guillartes",
    "Mr. Albert Babadilla & Mrs. Charedel Babadilla",
    "Mr. Jake Llarena & Mrs. Jenniferjun Llarena",
    "Mr. Domingo Madali & Mrs. Anita Sinoy",
    "Mr. Radjie Macapagal & Ms. Ana Matia Buenaventura",
    "Mr. Leonido Salvador & Ms. Susan Ochoa",
    "Mr. Emiliano Buan & Ms. Dianna Gonzales",
    "Mr. Jonathan Igama & Ms. Virginia Carrasco",
    "Mr. Percival Macalindong & Ms. Minnie Madali",
    "Mr. Chad Tanguinod & Mrs. Denice Tanguinod",
    "Mr. Emer Orfiano & Mrs. Neneth Orfiano",
    "Mr. Michael Debasa & Mrs. Mary Ann Dayao",
    "Mr. Renan Alcantara & Ms. Peng Alcantara"
  ];

  const groomsmen = [
    "Kirt Cornito", "Malvin Gonzales", "Jimwel Manguiat", "Jaed Enriquez",
    "Rommel Asuncion", "Johnred Bonita", "JC Buan", "RJ better",
    "Adekei Nunag", "Ed Viterbo", "Benjie Belleza"
  ];

  const bridesmaids = [
    "Shiloh Madali", "Angela De Castro", "Alexandra Pineda - prayer", "Tricia Cabrera",
    "Rose Bantugon", "Aliah Paner", "Tricia Indemne", "Anjanette Indemne",
    "Ariane Maunahan", "Angel Redondo", "Shena Regalado"
  ];
  
  const secondarySponsors = [
     { role: "Best Man", names: ["Mr. Charles Buan"] },
     { role: "Maids of Honor", names: ["Ms. Rexinne Manguiat", "Ms. Margarita Vidal"] },
     { role: "Candle", names: ["Ms. Kathleen Pineda", "Mr. Charles Domingo"] },
     { role: "Veil", names: ["Khayle Pala-Pala", "Mr. Renzo Awa"] },
     { role: "Cord", names: ["Ms. Leslie Lalap", "Mr. Jerwyn Chan"] }
  ];

  const bearers = [
    { role: "Ring Bearer", name: "Cody Manguiat" },
    { role: "Bible Bearer", name: "Knight Jimenez" },
    { role: "Coin Bearer", name: "Gavin Manguiat" },
    { role: "Here Comes The Bride Banner", names: ["Atasha Manguiat", "Sky Jimenez"] }
  ];

  const flowerGirlsBoys = [
    "Amity Adelante", "Athena Umandap", "Zhia Llarena", 
    "Dana Lizardo & Jacob Naverra", "Kayelie Manguiat & David Manalo",
    "Naomi Adelante & Daniel Manalo", "Margaux Atienza & Aiden Amianes"
  ];

  return (
    <section className="py-24 md:py-32 bg-stone-50 text-black relative">
       {/* Background Pattern */}
       <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 to-transparent pointer-events-none" />
       
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center relative z-10">
        <Reveal>
          <div className="mb-20">
            <h2 className="text-4xl md:text-7xl text-gold mb-4 font-display tracking-tight">The Entourage</h2>
            <p className="text-gray-500 italic text-lg md:text-xl font-serif">Witnesses to our Vows</p>
            <div className="w-24 h-px bg-gold mx-auto mt-8"></div>
          </div>
        </Reveal>

        <div className="space-y-24 md:space-y-32">
          {/* Parents */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
              <div className="space-y-6">
                <h3 className="text-gold font-display text-xl uppercase tracking-[0.2em] mb-2 border-b border-gold/20 pb-4 inline-block px-8">Bride's Parents</h3>
                <div className="space-y-2">
                  <p className="text-2xl md:text-3xl font-serif text-gray-800">Democrito Manguiat</p>
                  <p className="text-2xl md:text-3xl font-serif text-gray-800">Diana Darrie Manguiat</p>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-gold font-display text-xl uppercase tracking-[0.2em] mb-2 border-b border-gold/20 pb-4 inline-block px-8">Groom's Parents</h3>
                <div className="space-y-2">
                  <p className="text-2xl md:text-3xl font-serif text-gray-800">Crispulo Buan Jr.</p>
                  <p className="text-2xl md:text-3xl font-serif text-gray-800">Miriam Nimer</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Principal Sponsors */}
          <Reveal>
            <div className="bg-white p-8 md:p-16 shadow-[0_0_50px_-12px_rgba(0,0,0,0.05)] border border-stone-100 rounded-sm">
              <h3 className="text-gold font-display text-xl uppercase tracking-[0.3em] mb-12">Principal Sponsors</h3>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-base md:text-lg font-light text-gray-600 text-left md:text-center leading-relaxed font-serif">
                {principalSponsors.map((s, i) => (
                  <p key={i} className="hover:text-gold transition-colors duration-300 border-b border-stone-100 pb-2 md:border-none md:pb-0">{s}</p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Secondary Sponsors */}
          <Reveal>
             <h3 className="text-gold font-display text-xl uppercase tracking-[0.3em] mb-12">Secondary Sponsors</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
               {/* Best Man & MOH - Center on Mobile, distinct layout */}
               <div className="md:col-span-3 grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-stone-100/50 p-8 rounded-sm">
                    <p className="text-gold uppercase tracking-widest text-xs mb-4 font-bold">Best Man</p>
                    <p className="text-xl md:text-2xl font-serif text-gray-800">Mr. Charles Buan</p>
                  </div>
                  <div className="bg-stone-100/50 p-8 rounded-sm">
                    <p className="text-gold uppercase tracking-widest text-xs mb-4 font-bold">Maids of Honor</p>
                    <div className="space-y-2">
                      <p className="text-xl md:text-2xl font-serif text-gray-800">Ms. Rexinne Manguiat</p>
                      <p className="text-xl md:text-2xl font-serif text-gray-800">Ms. Margarita Vidal</p>
                    </div>
                  </div>
               </div>

               {/* Other Sponsors */}
               {secondarySponsors.slice(2).map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md border border-gray-100 hover:border-gold/30 transition-all duration-500 group flex flex-col items-center justify-center min-h-[160px]">
                  <p className="text-gold uppercase tracking-widest text-xs mb-4 group-hover:text-black transition-colors">{s.role}</p>
                  <div className="space-y-2">
                    {s.names.map((n, j) => (
                        <p key={j} className="text-lg md:text-xl font-serif text-gray-800">{n}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          
           {/* Bridal Party */}
           <Reveal>
            <div className="relative py-12">
               <div className="absolute inset-0 flex items-center" aria-hidden="true">
                 <div className="w-full border-t border-gold/20"></div>
               </div>
               <div className="relative flex justify-center">
                 <span className="bg-stone-50 px-6 text-gold font-display text-xl uppercase tracking-[0.3em]">The Bridal Party</span>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 md:gap-32">
              <div className="text-center">
                <h4 className="text-2xl font-serif italic mb-8 text-gray-400">The Groomsmen</h4>
                <div className="space-y-4">
                  {groomsmen.map((name, i) => (
                    <p key={i} className="text-lg text-gray-700 font-light hover:text-gold transition-colors tracking-wide">{name}</p>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-serif italic mb-8 text-gray-400">The Bridesmaids</h4>
                <div className="space-y-4">
                   {bridesmaids.map((name, i) => (
                    <p key={i} className="text-lg text-gray-700 font-light hover:text-gold transition-colors tracking-wide">{name}</p>
                   ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bearers & Flower Girls */}
           <Reveal>
            <div className="bg-stone-100/30 p-8 md:p-16 rounded-sm border border-stone-100">
              <div className="grid md:grid-cols-2 gap-16 md:gap-24">
                  <div className="text-center">
                      <h3 className="text-gold font-display text-xl uppercase tracking-[0.3em] mb-10">Bearers</h3>
                      <div className="space-y-8">
                      {bearers.map((b, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <p className="text-gray-400 uppercase tracking-widest text-[10px] mb-2">{b.role}</p>
                            <p className="text-xl font-serif text-gray-800">
                                {Array.isArray(b.names) ? b.names.join(" & ") : b.name}
                            </p>
                          </div>
                      ))}
                      </div>
                  </div>
                  <div className="text-center">
                      <h3 className="text-gold font-display text-xl uppercase tracking-[0.3em] mb-10">Flower Girls & Boys</h3>
                      <div className="space-y-4">
                      {flowerGirlsBoys.map((name, i) => (
                          <p key={i} className="text-lg font-serif text-gray-700">{name}</p>
                      ))}
                      </div>
                  </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// Invitation Component
const Invitation = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = Array.from({ length: 8 }, (_, i) => ({
    src: `/invitation/${i + 1}.jpeg`,
    alt: `Invitation Page ${i + 1}`
  }));

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % images.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <section id="invitation" className="py-24 bg-zinc-900 text-white relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl text-gold font-display">Official Invitation</h2>
          <p className="text-gray-400 uppercase tracking-widest text-sm">You are cordially invited</p>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, i) => (
            <Reveal key={i} className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-white/10 shadow-2xl cursor-pointer">
              <div onClick={() => setSelectedIndex(i)} className="w-full h-full relative">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white font-light tracking-widest uppercase text-xs bg-black/50 px-6 py-3 rounded-full border border-white/20 backdrop-blur-sm hover:bg-gold hover:text-black hover:border-gold">
                    View
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors p-2 z-[90]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold transition-colors p-2 z-[90] hidden md:block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 md:w-16 md:h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold transition-colors p-2 z-[90] hidden md:block"
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 md:w-16 md:h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={images[selectedIndex].src} 
                alt={images[selectedIndex].alt}
                className="max-w-full max-h-full object-contain rounded-sm shadow-2xl border border-white/10"
              />
              
              {/* Mobile Navigation Overlays */}
              <div className="absolute inset-y-0 left-0 w-1/4 z-[85] md:hidden" onClick={handlePrev}></div>
              <div className="absolute inset-y-0 right-0 w-1/4 z-[85] md:hidden" onClick={handleNext}></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const WeddingDetails = () => {
  return (
    <section className="py-24 bg-zinc-900 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-16">
        <Reveal>
          <h2 className="text-4xl md:text-6xl text-gold mb-12 font-display">Important Details</h2>
        </Reveal>

        <Reveal>
          <h3 className="text-2xl font-display mb-4 text-gold">Attire</h3>
          <p className="mb-8 text-gray-300">
            Please note that our celebration is a semi-formal event, and we kindly request that guests dress accordingly.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto bg-black/30 p-8 rounded-lg border border-white/10">
            <div>
              <p className="font-medium text-gold mb-2">✨ Gentleman Sponsors</p>
              <p className="text-sm text-gray-400 mb-6">Black suit, white inner, black tie, black shoes</p>
              
              <p className="font-medium text-gold mb-2">🤵 Male Guests</p>
              <p className="text-sm text-gray-400">Black semi-formal attire (long-sleeved shirt or polo shirt)</p>
            </div>
            <div>
              <p className="font-medium text-gold mb-2">✨ Lady Sponsors</p>
              <p className="text-sm text-gray-400 mb-6">Blush Pink Gown</p>
              
              <p className="font-medium text-gold mb-2">💃 Female Guests</p>
              <p className="text-sm text-gray-400">Black dress (mini, long, or jumpsuit)</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-red-400 italic">
            Kindly avoid: sando, shorts, slippers, and colors outside our motif.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/5 p-8 rounded-lg border border-white/5">
              <h3 className="text-xl font-display mb-4 text-gold">Adults-Only Celebration</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We love all of our friends’ and families’ children; however, due to space limitations, 
                we are unable to accommodate underage guests on our wedding day, with the exception 
                of children in the wedding entourage. We hope you take this opportunity to relax 
                and enjoy the celebration with us.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-lg border border-white/5">
              <h3 className="text-xl font-display mb-4 text-gold">Unplugged Ceremony</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our official photographers and videographers will be capturing every moment of our ceremony. 
                We kindly ask for your joyful smiles without the distraction of electronic devices. 
                Please keep phones and cameras away until we tie the knot.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="text-2xl font-display mb-4 text-gold">A Note on Gifts</h3>
          <p className="text-gray-300 italic max-w-xl mx-auto text-lg font-light">
            "With all that we have, we are truly blessed. Your presence and prayers are all that we request. 
            But if you still wish to give, a monetary gift is what we kindly suggest."
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // RSVP Form State
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes'
  });

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpStatus('loading');

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setRsvpStatus('success');
        setFormData({ name: '', email: '', attending: 'yes' });
      } else {
        setRsvpStatus('error');
      }
    } catch (error) {
      console.error('RSVP Error:', error);
      setRsvpStatus('error');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Music Player logic
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music/spongecola--piano-cover-by-gerard-chua.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Set volume to 50%

    // Attempt to play immediately
    const attemptPlay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay blocked by browser, waiting for interaction...");
          setIsPlaying(false);
        }
      }
    };

    attemptPlay();

    // Fallback: Play on first user interaction if autoplay failed
    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(e => console.log("Play failed:", e));
        setIsPlaying(true);
      }
      // Remove listeners after first interaction
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      {/* Music Player Button */}
      <button 
        onClick={togglePlay}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-gold/50 rounded-full flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all duration-300 group shadow-lg"
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          <div className="flex gap-1 h-4 items-end">
             <motion.div animate={{ height: [4, 16, 8, 12] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-current" />
             <motion.div animate={{ height: [12, 4, 16, 8] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-1 bg-current" />
             <motion.div animate={{ height: [8, 12, 4, 16] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-1 bg-current" />
          </div>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
        )}
      </button>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center gap-8 text-2xl font-display text-white">
              {['Home', 'Story', 'Invitation', 'Details', 'RSVP'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-gold transition-colors tracking-widest uppercase"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'py-6 md:py-8'}`}
      >
        {/* Desktop Nav */}
        <div className="hidden md:flex justify-center items-center gap-12 uppercase tracking-[0.2em] text-sm font-light px-4">
          <a href="#home" className="hover:text-gold transition-colors relative group">
            Home
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#story" className="hover:text-gold transition-colors relative group">
            Story
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
          <span className="text-2xl font-display text-gold px-4 cursor-default whitespace-nowrap">J & L</span>
          <a href="#invitation" className="hover:text-gold transition-colors relative group">
            Invitation
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#details" className="hover:text-gold transition-colors relative group">
            Details
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#rsvp" className="hover:text-gold transition-colors relative group">
            RSVP
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex justify-between items-center px-6">
          <span className="text-xl font-display text-gold">J & L</span>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: scrollY * 0.5 }}
        >
          <Image
            src={"/hero-section.jpg"}
            alt="Luxury Yacht"
            fill
            className="object-cover opacity-60 scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 space-y-8">
          <motion.p 
            variants={textReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="text-sm md:text-base uppercase tracking-[0.5em] text-gold mb-4"
          >
            The Wedding Celebration of
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-6xl md:text-9xl text-white font-display tracking-tight leading-none"
          >
            Jastine <motion.span 
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-gold font-serif italic text-4xl md:text-7xl align-middle mx-4 inline-block"
            >&</motion.span> Leonard
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-4 mt-8"
          >
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 64 }}
              transition={{ delay: 2, duration: 1 }}
              className="w-px bg-gradient-to-b from-gold to-transparent"
            ></motion.div>
            <p className="text-xl md:text-2xl uppercase tracking-[0.3em] text-gray-200">
              April 11, 2026
            </p>
            <p className="italic text-lg font-light text-gray-400">
              Diocesan Shrine and Parish of St. Mary Magdalena • 2:30 PM
            </p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-12 bg-gray-500"
          ></motion.div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <Countdown />

      {/* Intro / Save The Date */}
      <section id="story" className="py-32 bg-stone-50 text-black relative overflow-hidden">
        <motion.div 
          style={{ y: scrollY * -0.1 }}
          className="absolute top-0 right-0 w-1/3 h-full bg-stone-100 -skew-x-12 transform translate-x-20 pointer-events-none"
        ></motion.div>
        
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative h-[700px] w-full group"
          >
            <div className="absolute inset-0 border border-gold/30 transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
            <Image
              src="/wedding-shoot/644231006_759220623655508_5739970447042265428_n.jpg"
              alt="Couple Photo"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
          
          <div className="space-y-10 text-center md:text-left">
            <Reveal>
              <h2 className="text-5xl md:text-7xl leading-tight text-black">
                A Love as Deep <br />
                <span className="italic text-gold font-serif text-4xl md:text-6xl">as the Ocean</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-lg leading-relaxed text-gray-600 font-light max-w-md mx-auto md:mx-0">
                We invite you to join us for an unforgettable evening of elegance and romance. 
                As the sun sets over the horizon, we will exchange our vows surrounded by the 
                people who mean the most to us.
              </p>
            </Reveal>
            
            <Reveal className="pt-8 flex flex-col md:flex-row gap-8 items-center justify-center md:justify-start">
               <div className="text-center md:text-left group cursor-default">
                 <p className="text-3xl font-display text-black group-hover:text-gold transition-colors duration-500">The Venue</p>
                 <p className="text-sm uppercase tracking-widest text-gold mt-2">Villa Lorenza Resort</p>
               </div>
               <div className="h-px w-12 bg-black/10 md:w-px md:h-12"></div>
               <div className="text-center md:text-left group cursor-default">
                 <p className="text-3xl font-display text-black group-hover:text-gold transition-colors duration-500">The Date</p>
                 <p className="text-sm uppercase tracking-widest text-gold mt-2">April 11, 2026</p>
               </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Love Story Section */}
      <LoveStory />

      {/* Venues Section */}
      <Venues />

      {/* Gallery Section */}
      <Gallery />

      {/* Entourage Section */}
      <Entourage />

      {/* Invitation Section */}
      <Invitation />

      {/* Itinerary Section */}
      <section id="details" className="py-32 bg-zinc-950 text-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-5xl md:text-6xl mb-4">The Itinerary</h2>
            <p className="text-gold italic mb-20 text-xl">Order of Events</p>
          </Reveal>
          
          <div className="relative">
            {/* Center Line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent transform -translate-x-1/2 hidden md:block"
            ></motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-24"
            >
              {[
                { time: "2:30 PM", event: "Ceremony", desc: "Exchange of vows on the deck" },
                { time: "4:30 PM", event: "Reception", desc: "Celebrate the night away at Villa Lorenza Resort." },
                { time: "9:00 PM", event: "After Party", desc: "Music and dancing into the night" },
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  className="flex flex-col md:flex-row items-center justify-between group hover:text-gold transition-colors duration-500"
                >
                   <div className={`md:w-1/2 p-8 ${index % 2 === 0 ? "md:text-right" : "md:order-last md:text-left"}`}>
                     <h3 className="text-3xl mb-2 font-display">{item.event}</h3>
                     <p className="text-gray-500 font-sans italic text-sm tracking-wide group-hover:text-gray-300 transition-colors">{item.desc}</p>
                   </div>
                   
                   <motion.div 
                     initial={{ scale: 0 }}
                     whileInView={{ scale: 1 }}
                     transition={{ delay: 0.5 + (index * 0.2), type: "spring" }}
                     className="relative z-10 w-3 h-3 bg-black rounded-full border border-gold shadow-[0_0_15px_rgba(212,175,55,0.5)] my-4 md:my-0 group-hover:scale-150 transition-transform duration-300"
                   ></motion.div>
                   
                   <div className={`md:w-1/2 p-8 ${index % 2 === 0 ? "md:text-left" : "md:order-first md:text-right"}`}>
                      <span className="text-4xl font-display text-white/80 group-hover:text-gold transition-colors duration-500">{item.time}</span>
                   </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-32 bg-white text-black text-center relative overflow-hidden">
        {/* Decorative Circle */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black/5 rounded-full pointer-events-none"
        ></motion.div>
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-black/5 rounded-full pointer-events-none"
        ></motion.div>

        <div className="max-w-xl mx-auto px-4 relative z-10">
          <Reveal>
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">You are invited</p>
            <h2 className="text-6xl mb-8">R.S.V.P.</h2>
            <p className="text-gray-600 mb-12 font-light">
              We would be honored by your presence.<br/>
              Please respond by <span className="text-black border-b border-gold pb-1">March 1st, 2026</span>
            </p>
          </Reveal>
          
          {rsvpStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-50 p-12 border border-gold/30 shadow-2xl text-center space-y-6"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-3xl font-display text-gold">Thank You!</h3>
              <p className="text-gray-600">Your RSVP has been sent successfully. We can't wait to celebrate with you!</p>
              <button 
                onClick={() => setRsvpStatus('idle')}
                className="text-sm uppercase tracking-widest text-gold hover:text-black transition-colors mt-8 border-b border-gold pb-1"
              >
                Send another response
              </button>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleRsvpSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-8 bg-zinc-50 p-12 backdrop-blur-sm border border-black/10 shadow-2xl relative"
            >
              {rsvpStatus === 'error' && (
                <div className="bg-red-50 text-red-600 p-4 rounded text-sm mb-4 border border-red-200">
                  Something went wrong. Please try again later.
                </div>
              )}
              
              <div className="space-y-1 group">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-300 py-4 text-center focus:outline-none focus:border-gold transition-colors placeholder-gray-500 text-lg font-light text-black"
                />
              </div>
              <div className="space-y-1 group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b border-gray-300 py-4 text-center focus:outline-none focus:border-gold transition-colors placeholder-gray-500 text-lg font-light text-black"
                />
              </div>
              
              <div className="flex justify-center gap-12 py-8">
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <div className="relative">
                     <input 
                       type="radio" 
                       name="attending" 
                       value="yes"
                       checked={formData.attending === 'yes'}
                       onChange={(e) => setFormData({...formData, attending: 'yes'})}
                       className="peer sr-only" 
                     />
                     <div className="w-5 h-5 border border-gray-400 rounded-full peer-checked:border-gold peer-checked:bg-gold transition-all"></div>
                   </div>
                   <span className="uppercase tracking-wider text-xs group-hover:text-gold transition-colors">Joyfully Accept</span>
                 </label>
                 <label className="flex items-center gap-3 cursor-pointer group">
                   <div className="relative">
                     <input 
                       type="radio" 
                       name="attending" 
                       value="no"
                       checked={formData.attending === 'no'}
                       onChange={(e) => setFormData({...formData, attending: 'no'})}
                       className="peer sr-only" 
                     />
                     <div className="w-5 h-5 border border-gray-400 rounded-full peer-checked:border-gold peer-checked:bg-gold transition-all"></div>
                   </div>
                   <span className="uppercase tracking-wider text-xs group-hover:text-gold transition-colors">Regretfully Decline</span>
                 </label>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#d4af37", color: "#fff", borderColor: "#d4af37" }}
                whileTap={{ scale: 0.95 }}
                disabled={rsvpStatus === 'loading'}
                className="mt-8 px-12 py-4 bg-black text-white uppercase tracking-[0.2em] text-sm transition-all duration-300 w-full md:w-auto border border-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {rsvpStatus === 'loading' ? 'Sending...' : 'Confirm Attendance'}
              </motion.button>
            </motion.form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-zinc-950 text-center border-t border-white/5">
        <Reveal>
          <h2 className="text-3xl font-display text-white mb-6">J & L</h2>
          <div className="flex justify-center gap-8 mb-8">
            <a href="#" className="text-gray-500 hover:text-gold transition-colors uppercase text-xs tracking-widest">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-gold transition-colors uppercase text-xs tracking-widest">Hashtag</a>
          </div>
          <p className="text-gray-600 text-xs uppercase tracking-widest">
            © 2026 Jastine & Leronard • Designed with Love
          </p>
        </Reveal>
      </footer>
    </main>
  );
}
