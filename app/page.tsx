"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion"
import CountUp from "react-countup"
import {
  ChefHat,
  Leaf,
  Wine,
  Sun,
  Users,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Star,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  MessageCircle,
  CircleParking,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// ── Helpers ──────────────────────────────────────────────

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
}

const staggerContainer = (staggerDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay
    }
  }
})

const SCHEDULE: Record<number, [number, number] | null> = {
  0: null,          // Dimanche
  1: null,          // Lundi
  2: [540, 930],    // Mardi 9h-15h30
  3: [540, 1140],   // Mercredi 9h-19h
  4: [540, 1320],   // Jeudi 9h-22h
  5: [540, 1320],   // Vendredi 9h-22h
  6: [600, 1320],   // Samedi 10h-22h
}

function isOpenNow() {
  const now = new Date()
  const slot = SCHEDULE[now.getDay()]
  if (!slot) return { open: false, label: "Fermé" }
  const t = now.getHours() * 60 + now.getMinutes()
  return t >= slot[0] && t < slot[1]
    ? { open: true, label: "Ouvert" }
    : { open: false, label: "Fermé" }
}

function isClosedDay(dateStr: string) {
  if (!dateStr) return false
  const d = new Date(dateStr + "T12:00:00")
  const day = d.getDay()
  return day === 0 || day === 1
}

// ── Navigation ───────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  const status = isOpenNow()

  const navItems = [
    { label: "Philosophie", href: "#philosophie" },
    { label: "La Carte", href: "#menu" },
    { label: "Galerie", href: "#galerie" },
    { label: "Avis", href: "#avis" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-warm-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#" className="font-[var(--font-cormorant)] text-xl sm:text-2xl italic text-foreground">
              Le Petit Resto
            </a>
            <span className={cn(
              "hidden sm:inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium",
              status.open
                ? "bg-sage/20 text-sage"
                : "bg-terracotta/15 text-terracotta"
            )}>
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                status.open ? "bg-sage" : "bg-terracotta"
              )} />
              {status.label}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm tracking-wide text-foreground/80 hover:text-copper transition-colors"
              >
                {item.label}
              </a>
            ))}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="px-5 py-2 bg-copper text-warm-white text-sm tracking-wide rounded-full hover:bg-terracotta transition-colors"
            >
              Réserver
            </motion.a>
          </div>

          {/* Mobile: status badge + menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <span className={cn(
              "sm:hidden inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full font-medium",
              status.open
                ? "bg-sage/20 text-sage"
                : "bg-terracotta/15 text-terracotta"
            )}>
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                status.open ? "bg-sage" : "bg-terracotta"
              )} />
              {status.label}
            </span>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-foreground"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-warm-white md:hidden overflow-hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center">
                <span className="font-[var(--font-cormorant)] text-2xl italic">Le Petit Resto</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-8">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, ease: "easeOut" }}
                    className="text-2xl font-serif text-foreground hover:text-copper transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ delay: 0.5, ease: "easeOut" }}
                  className="mt-4 px-8 py-3 bg-copper text-warm-white text-lg rounded-full"
                >
                  Réserver une table
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Hero ─────────────────────────────────────────────────

function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative h-screen h-[100dvh] flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop"
          alt="Vue du restaurant Le Petit Resto à Rodez"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/60 via-deep-black/40 to-deep-black/70" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 sm:px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          className="font-[var(--font-cormorant)] text-warm-white italic mb-4 sm:mb-6"
        >
          Le Petit Resto
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          style={{ fontSize: 'clamp(0.7rem, 1.5vw, 1rem)' }}
          className="text-warm-white/80 tracking-[0.15em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-5"
        >
          Cuisine de marché • Fait maison • Rodez
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="text-copper text-sm sm:text-base mb-8 sm:mb-10"
        >
          Menu complet dès 25€
        </motion.p>
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.9, ease: "easeOut" }
          }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-copper text-warm-white text-sm tracking-wide rounded-full hover:bg-terracotta transition-colors"
        >
          Réserver une table
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, ease: "easeOut" }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="flex flex-col items-center text-warm-white/60"
        >
          <span className="text-xs tracking-widest uppercase mb-2">Découvrir</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ── Section Wrapper ──────────────────────────────────────

function AnimatedSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// ── Philosophy ───────────────────────────────────────────

function PhilosophySection() {
  return (
    <AnimatedSection id="philosophie" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 texture-overlay bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
                alt="Plats dressés avec soin"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="hidden md:block absolute -bottom-6 -right-6 w-32 h-32 border-2 border-copper/30 rounded-xl -z-10" />
          </div>

          {/* Text */}
          <div className="lg:col-span-5">
            <h2
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
              className="font-serif italic text-foreground mb-6 md:mb-8 text-balance"
            >
              Chaque jour, le marché décide
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-6 md:mb-8">
              Chez nous, la carte change tous les jours. 3 plats — viande, poisson, végétarien — élaborés le matin même avec les plus beaux produits du marché. Pas de congélateur, pas de compromis. Du fait maison, du pain jusqu&apos;au dessert.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-8 md:mb-10">
              Notre cuisine ouverte est notre promesse de transparence : tout se passe sous vos yeux.
            </p>

            <blockquote className="relative pl-6 border-l-2 border-copper mb-8 md:mb-10">
              <p
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}
                className="font-[var(--font-cormorant)] italic text-foreground"
              >
                « La qualité, pas la quantité. »
              </p>
            </blockquote>

            {/* Chef & Patronne */}
            <div className="flex items-start gap-4 pt-6 border-t border-border">
              <div className="w-14 h-14 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
                <ChefHat className="w-6 h-6 text-copper" />
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Un chef passionné, une patronne dévouée</p>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  En cuisine, un chef qui sublime les produits du terroir aveyronnais. En salle, une hôtesse souriante et proche de ses clients. C&apos;est cette complicité qui fait l&apos;âme du Petit Resto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

// ── Menu ─────────────────────────────────────────────────

function MenuSection() {
  const mainDishes = [
    {
      icon: "🥩",
      type: "Le plat viande",
      name: "Épaule d'agneau confite, jus au thym, écrasé de pommes de terre",
      price: "22€"
    },
    {
      icon: "🐟",
      type: "Le plat poisson",
      name: "Pavé de lieu jaune, beurre blanc aux agrumes, légumes croquants",
      price: "22€"
    },
    {
      icon: "🌿",
      type: "Le plat végétarien",
      name: "Risotto crémeux aux champignons de saison, copeaux de parmesan",
      price: "19€"
    }
  ]

  const desserts = [
    "Crème brûlée à la vanille",
    "Tarte aux fruits de saison",
    "Assiette de fromages affinés"
  ]

  return (
    <AnimatedSection id="menu" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-cream/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            className="font-serif text-foreground mb-4"
          >
            La carte du jour
          </h2>
          <p className="text-copper text-sm tracking-widest uppercase mb-2">
            Exemple de carte
          </p>
          <p className="text-foreground/50 text-xs">
            La carte change chaque jour selon les arrivages du marché
          </p>
        </div>

        {/* Main Dishes */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12 md:mb-16"
        >
          {mainDishes.map((dish) => (
            <motion.article
              key={dish.type}
              variants={fadeUpVariants}
              className="bg-warm-white rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">{dish.icon}</span>
              <p className="text-copper text-xs tracking-widest uppercase mb-2">{dish.type}</p>
              <h3 className="font-serif text-lg sm:text-xl text-foreground mb-3 sm:mb-4">{dish.name}</h3>
              <p className="text-xl sm:text-2xl font-serif text-terracotta">{dish.price}</p>
            </motion.article>
          ))}
        </motion.div>

        <div className="divider-gold max-w-xs mx-auto mb-12 md:mb-16" />

        {/* Desserts */}
        <div className="text-center mb-8">
          <h3
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}
            className="font-serif text-foreground mb-4 sm:mb-6"
          >
            Les desserts — 8€
          </h3>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 text-foreground/70">
            {desserts.map((dessert, i) => (
              <span key={i} className="flex items-center justify-center">
                {dessert}
                {i < desserts.length - 1 && <span className="hidden sm:inline mx-4 text-copper">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Menu Formulas */}
        <div className="bg-warm-white rounded-xl p-6 sm:p-8 text-center max-w-2xl mx-auto">
          <p className="text-foreground/70 mb-4">
            <span className="font-medium text-foreground">Menu entrée + plat ou plat + dessert :</span> 21€
          </p>
          <p className="text-foreground/70 mb-4">
            <span className="font-medium text-foreground">Menu complet :</span> 25€
          </p>
          <p className="text-foreground/50 text-xs mb-6">
            Allergies ou intolérances ? Parlez-nous-en, nous adaptons nos plats.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream rounded-full">
            <Star className="w-4 h-4 text-copper fill-copper" />
            <span className="text-xs sm:text-sm text-foreground/70">Recommandé par le Guide du Routard</span>
          </div>
        </div>

        {/* Urgency nudge */}
        <p className="text-center text-foreground/40 text-xs mt-8 italic">
          30 couverts seulement — pensez à réserver pour ne pas rater la carte du jour
        </p>
      </div>
    </AnimatedSection>
  )
}

// ── Gallery ──────────────────────────────────────────────

function GallerySection() {
  const images = [
    { src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop", alt: "Plat gastronomique", aspect: "aspect-[4/3]" },
    { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop", alt: "Cuisine ouverte", aspect: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop", alt: "Pain fait maison", aspect: "aspect-[3/4]" },
    { src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop", alt: "Vin sélectionné", aspect: "aspect-[4/3]" },
    { src: "https://images.unsplash.com/photo-1515669097368-22e68427d265?q=80&w=2070&auto=format&fit=crop", alt: "Terrasse", aspect: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=2074&auto=format&fit=crop", alt: "Le chef en action", aspect: "aspect-[3/4]" },
  ]

  return (
    <AnimatedSection id="galerie" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            className="font-serif text-foreground mb-4"
          >
            Dans l&apos;assiette et en coulisses
          </h2>
          <p className="text-foreground/60">Un aperçu de notre univers</p>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:mx-0 md:px-0 md:pb-0 lg:gap-6 scrollbar-hide"
        >
          {images.map((image, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariants}
              className={cn(
                "relative overflow-hidden rounded-xl group cursor-pointer snap-start",
                "min-w-[75vw] sm:min-w-[60vw] md:min-w-0",
                image.aspect
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 75vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-deep-black/0 group-hover:bg-deep-black/40 transition-colors duration-300 flex items-end p-4">
                <span className="text-warm-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                  {image.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// ── Stat Counter ─────────────────────────────────────────

function StatCounter({ value }: { value: string }) {
  let prefix = ''
  let suffix = ''
  let end: number
  let decimals = 0

  if (value.includes('/')) {
    const parts = value.split('/')
    end = parseFloat(parts[0])
    suffix = '/' + parts[1]
  } else if (value.startsWith('#')) {
    prefix = '#'
    end = parseFloat(value.slice(1))
  } else {
    end = parseFloat(value.replace(/[^0-9.]/g, ''))
    if (value.includes('+')) suffix = '+'
  }

  decimals = end % 1 !== 0 ? 1 : 0

  return (
    <span className="tabular-nums">
      <CountUp
        end={end}
        duration={2}
        decimals={decimals}
        prefix={prefix}
        suffix={suffix}
        enableScrollSpy
        scrollSpyOnce
      />
    </span>
  )
}

// ── Reviews ──────────────────────────────────────────────

function ReviewsSection() {
  const reviews = [
    {
      text: "Un chef exceptionnel, des saveurs authentiques, un rapport qualité-prix imbattable. À ce prix-là, foncez les yeux fermés.",
      author: "Marie L.",
      source: "Google",
      rating: 5
    },
    {
      text: "Cuisine ouverte impeccable, produits frais sublimés. Un restaurant qui mérite d'être connu.",
      author: "Jean-Pierre D.",
      source: "Google",
      rating: 5
    },
    {
      text: "Pain fait maison, plats généreux, un chef passionné qui partage sa vision. On reviendra !",
      author: "Sophie M.",
      source: "Tripadvisor",
      rating: 5
    },
    {
      text: "La patronne est exceptionnelle. Gentille, souriante, proche de sa clientèle. Les plats étaient succulents.",
      author: "François B.",
      source: "Google",
      rating: 5
    }
  ]

  const stats = [
    { value: "4.9", label: "Note Google" },
    { value: "130+", label: "Avis clients" },
    { value: "5/5", label: "Tripadvisor" },
    { value: "#10", label: "Top restaurants Rodez" }
  ]

  return (
    <AnimatedSection id="avis" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-deep-black text-warm-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            className="font-serif mb-4"
          >
            Ce que nos clients en disent
          </h2>
          <p className="text-warm-white/60 text-sm sm:text-base">La meilleure recommandation vient de ceux qui nous ont fait confiance</p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:snap-none md:mx-0 md:px-0 md:pb-0 md:gap-6 mb-12 md:mb-20 scrollbar-hide">
          {reviews.map((review, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="min-w-[85vw] sm:min-w-[70vw] md:min-w-0 snap-start bg-warm-white/5 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-warm-white/10"
            >
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-copper fill-copper" />
                ))}
              </div>
              <p className="text-warm-white/90 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                « {review.text} »
              </p>
              <div className="flex items-center justify-between">
                <span className="text-warm-white/60 text-sm">{review.author}</span>
                <span className="text-copper text-xs">{review.source}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
                className="font-serif text-copper mb-2"
              >
                <StatCounter value={stat.value} />
              </div>
              <p className="text-warm-white/60 text-xs sm:text-sm tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

// ── Experience ───────────────────────────────────────────

function ExperienceSection() {
  const features = [
    {
      icon: ChefHat,
      title: "Cuisine ouverte",
      description: "Tout se passe sous vos yeux"
    },
    {
      icon: Leaf,
      title: "Produits frais",
      description: "Du marché à l'assiette chaque matin"
    },
    {
      icon: Wine,
      title: "Vins sélectionnés",
      description: "Ardèche, Minervois et belles découvertes"
    },
    {
      icon: Sun,
      title: "Terrasse",
      description: "20 places au soleil, avenue Victor Hugo"
    },
    {
      icon: Users,
      title: "Accueil famille",
      description: "Menus adaptés pour les enfants sur demande"
    }
  ]

  return (
    <AnimatedSection className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          alt="Intérieur du restaurant"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-deep-black/70" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            className="font-serif text-warm-white mb-4"
          >
            L&apos;expérience Le Petit Resto
          </h2>
          <p className="text-warm-white/60 text-sm sm:text-base">Un cadre pensé pour le plaisir de tous les sens</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className={cn(
                "text-center",
                i === features.length - 1 && "col-span-2 sm:col-span-1"
              )}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-copper/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-copper" />
              </div>
              <h3 className="text-warm-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-warm-white/60 text-xs sm:text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

// ── Contact ──────────────────────────────────────────────

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '19h30',
    guests: '2',
    message: ''
  })
  const [dateWarning, setDateWarning] = useState('')
  const [formSent, setFormSent] = useState(false)

  const handleDateChange = (dateStr: string) => {
    setFormData({ ...formData, date: dateStr })
    if (isClosedDay(dateStr)) {
      setDateWarning('Le restaurant est fermé le dimanche et le lundi.')
    } else {
      setDateWarning('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isClosedDay(formData.date)) return
    const msg = [
      `Bonjour, je souhaite réserver une table :`,
      `• Nom : ${formData.name}`,
      `• Tél : ${formData.phone}`,
      formData.email ? `• Email : ${formData.email}` : '',
      `• Date : ${formData.date}`,
      `• Heure : ${formData.time}`,
      `• Couverts : ${formData.guests}`,
      formData.message ? `• Note : ${formData.message}` : ''
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/33601312574?text=${encodeURIComponent(msg)}`, '_blank')
    setFormSent(true)
  }

  const todayStr = new Date().toISOString().split('T')[0]

  const hours = [
    { day: "Mardi", hours: "9h - 15h30" },
    { day: "Mercredi", hours: "9h - 19h" },
    { day: "Jeudi - Vendredi", hours: "9h - 22h" },
    { day: "Samedi", hours: "10h - 22h" },
    { day: "Dimanche & Lundi", hours: "Fermé" },
  ]

  return (
    <AnimatedSection id="contact" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-cream/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            className="font-serif text-foreground mb-4"
          >
            Réservez votre table
          </h2>
          <p className="text-foreground/60 text-sm sm:text-base">30 couverts en salle + 20 en terrasse</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          {/* Reservation Form */}
          <div className="bg-warm-white rounded-xl p-5 sm:p-6 lg:p-8 shadow-sm">
            {formSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-sage" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">Demande envoyée !</h3>
                <p className="text-foreground/60 text-sm mb-6 max-w-sm">
                  Votre demande a été transmise via WhatsApp. Nous confirmerons votre réservation dans les plus brefs délais.
                </p>
                <p className="text-foreground/50 text-xs mb-6">
                  Vous pouvez aussi nous appeler directement :
                </p>
                <a
                  href="tel:+33601312574"
                  className="inline-flex items-center gap-2 text-copper hover:text-terracotta transition-colors font-medium"
                >
                  <Phone className="w-4 h-4" />
                  06 01 31 25 74
                </a>
                <button
                  onClick={() => { setFormSent(false); setFormData({ name: '', phone: '', email: '', date: '', time: '19h30', guests: '2', message: '' }) }}
                  className="mt-6 text-sm text-foreground/40 hover:text-foreground/60 transition-colors underline underline-offset-2"
                >
                  Faire une nouvelle réservation
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Nom</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background border-border w-full"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Téléphone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-background border-border w-full"
                      placeholder="06 00 00 00 00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-foreground/70 mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border-border w-full"
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Date</label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleDateChange(e.target.value)}
                      min={todayStr}
                      required
                      className={cn(
                        "bg-background border-border w-full",
                        dateWarning && "border-terracotta"
                      )}
                    />
                    {dateWarning && (
                      <p className="text-terracotta text-xs mt-1">{dateWarning}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Heure</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground text-sm"
                    >
                      <option value="12h00">12h00</option>
                      <option value="12h30">12h30</option>
                      <option value="13h00">13h00</option>
                      <option value="19h30">19h30</option>
                      <option value="20h00">20h00</option>
                      <option value="20h30">20h30</option>
                      <option value="21h00">21h00</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Couverts</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'personne' : 'personnes'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-foreground/70 mb-2">Message (optionnel)</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background border-border resize-none w-full"
                    placeholder="Allergies, occasion spéciale, demandes particulières..."
                    rows={3}
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Button
                    type="submit"
                    disabled={!!dateWarning}
                    className="w-full bg-copper hover:bg-terracotta text-warm-white py-5 sm:py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Réserver via WhatsApp
                  </Button>
                </motion.div>

                <p className="text-center text-foreground/40 text-xs">
                  Ou appelez directement le{" "}
                  <a href="tel:+33601312574" className="text-copper hover:underline">06 01 31 25 74</a>
                </p>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-copper" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Adresse</h3>
                <p className="text-foreground/70 text-sm sm:text-base">43 Avenue Victor Hugo</p>
                <p className="text-foreground/70 text-sm sm:text-base">12000 Rodez, France</p>
                <a
                  href="https://maps.google.com/?q=43+Avenue+Victor+Hugo+12000+Rodez+France"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-copper text-sm mt-2 hover:underline"
                >
                  Voir sur Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Parking */}
            <div className="flex gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
                <CircleParking className="w-4 h-4 sm:w-5 sm:h-5 text-copper" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Accès & Parking</h3>
                <p className="text-foreground/70 text-sm sm:text-base">Parking gratuit à proximité sur l&apos;avenue</p>
                <p className="text-foreground/70 text-sm">Arrêt de bus Cathédrale à 5 min à pied</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-copper" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Téléphone</h3>
                <a href="tel:+33601312574" className="text-foreground/70 hover:text-copper transition-colors">
                  06 01 31 25 74
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-copper" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-foreground mb-3">Horaires</h3>
                <div className="space-y-2">
                  {hours.map((item) => (
                    <div key={item.day} className="flex justify-between gap-4 sm:gap-8 text-sm">
                      <span className="text-foreground/70">{item.day}</span>
                      <span className={cn(
                        "whitespace-nowrap",
                        item.hours === "Fermé" ? "text-terracotta" : "text-foreground"
                      )}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-copper" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Instagram</h3>
                <a
                  href="https://instagram.com/lepetitresto12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-copper hover:underline"
                >
                  @lepetitresto12
                </a>
                <p className="text-foreground/50 text-xs mt-1">Découvrez les plats du jour en story</p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden h-40 sm:h-48 bg-cream">
              <iframe
                src="https://maps.google.com/maps?q=43+Avenue+Victor+Hugo+12000+Rodez+France&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Le Petit Resto"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

// ── Floating Buttons (mobile) ────────────────────────────

function FloatingButtons() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 500)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 md:hidden"
        >
          <a
            href="https://wa.me/33601312574?text=Bonjour%2C%20je%20souhaiterais%20r%C3%A9server%20une%20table."
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            aria-label="Réserver par WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
          <a
            href="tel:+33601312574"
            className="w-14 h-14 rounded-full bg-copper text-warm-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            aria-label="Appeler le restaurant"
          >
            <Phone className="w-6 h-6" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Footer ───────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-deep-black text-warm-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <h2
            style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)' }}
            className="font-[var(--font-cormorant)] italic mb-2"
          >
            Le Petit Resto
          </h2>
          <p className="text-warm-white/60 text-xs sm:text-sm tracking-wider">
            Cuisine de marché, fait maison, Rodez
          </p>
        </div>

        <div className="flex justify-center gap-6 sm:gap-8 mb-10 sm:mb-12">
          <motion.a
            href="https://instagram.com/lepetitresto12"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-10 h-10 rounded-full bg-warm-white/10 flex items-center justify-center hover:bg-copper transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://tripadvisor.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-10 h-10 rounded-full bg-warm-white/10 flex items-center justify-center hover:bg-copper transition-colors"
            aria-label="Tripadvisor"
          >
            <Star className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://maps.google.com/?q=43+Avenue+Victor+Hugo+12000+Rodez+France"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-10 h-10 rounded-full bg-warm-white/10 flex items-center justify-center hover:bg-copper transition-colors"
            aria-label="Google Maps"
          >
            <MapPin className="w-5 h-5" />
          </motion.a>
        </div>

        <div className="divider-gold mb-8" />

        <div className="text-center space-y-2">
          <p className="text-warm-white/40 text-xs sm:text-sm">
            © 2025 Le Petit Resto — Tous droits réservés
          </p>
          <p className="text-warm-white/40 text-xs">
            Site réalisé par{" "}
            <a href="https://irya.fr" target="_blank" rel="noopener noreferrer" className="hover:text-copper transition-colors underline-offset-2 hover:underline">
              IRYA — irya.fr
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

// ── Section Divider ──────────────────────────────────────

function SectionDivider() {
  return (
    <div aria-hidden="true" className="flex justify-center">
      <div className="w-[60px] h-px bg-copper/40" />
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────

export default function LePetitResto() {
  return (
    <main className="texture-overlay overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PhilosophySection />
      <SectionDivider />
      <MenuSection />
      <SectionDivider />
      <GallerySection />
      <SectionDivider />
      <ReviewsSection />
      <ExperienceSection />
      <SectionDivider />
      <ContactSection />
      <Footer />
      <FloatingButtons />
    </main>
  )
}
