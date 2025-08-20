"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TrendingUp, BarChart3, Target, Shield, Clock, Users, Award, Play } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function SMCLandingPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 44,
    seconds: 48,
  })

  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const [videoError, setVideoError] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))

            const children = entry.target.querySelectorAll("[data-stagger]")
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("animate-fade-in-up")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current

      // Set up video event listeners
      const handleCanPlay = () => {
        video.play().catch((error) => {
          console.log("[v0] Video autoplay blocked, showing play button:", error.message)
          setShowPlayButton(true)
          setVideoError(false)
        })
      }

      const handleError = () => {
        console.log("[v0] Video failed to load, using fallback background")
        setVideoError(true)
        setShowPlayButton(false)
      }

      const handleLoadedData = () => {
        console.log("[v0] Video loaded successfully")
        setVideoError(false)
      }

      video.addEventListener("canplay", handleCanPlay)
      video.addEventListener("error", handleError)
      video.addEventListener("loadeddata", handleLoadedData)

      // Try to load the video
      video.load()

      return () => {
        video.removeEventListener("canplay", handleCanPlay)
        video.removeEventListener("error", handleError)
        video.removeEventListener("loadeddata", handleLoadedData)
      }
    }
  }, [])

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setShowPlayButton(false)
        })
        .catch((error) => {
          console.log("[v0] Manual video play failed:", error.message)
          setVideoError(true)
        })
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {!videoError ? (
            <>
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-30"
                poster="/trading-setup-1.jpg"
              >
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/V%C3%ADdeo%20do%20WhatsApp%20de%202025-08-16%20%C3%A0%28s%29%2022.12.03_6e3e74d9-j2lbcAvSuc6uFcZuWFTMPzhlpCkqPl.mp4" type="video/mp4" />
              </video>
              {showPlayButton && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button
                    onClick={handleVideoPlay}
                    className="bg-black/50 hover:bg-black/70 rounded-full p-6 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                    aria-label="Play background video"
                  >
                    <Play className="w-12 h-12 text-white" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center opacity-30"
              style={{ backgroundImage: 'url("/trading-setup-1.jpg")' }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-yellow-900/20"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-cyan-500/30 text-cyan-300 border-cyan-400/50 text-sm px-6 py-3 animate-fade-in-up animate-glow backdrop-blur-sm">
            ✨ Método Exclusivo SMC
          </Badge>

          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up animate-delay-200">
            Transforme R$ 1.000 em uma{" "}
            <span className="gold-accent text-reveal bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-shimmer">
            renda extra
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-400 backdrop-blur-sm">
            Descubra o método EXATO que Pedro Coden usa para gerar R$ 9.300+ por mês operando apenas 2 horas por dia com
            Smart Money Concepts
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animate-delay-600">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-semibold px-10 py-5 text-lg neon-glow hover-lift animate-pulse-slow shadow-2xl"
            >
              🚀 QUERO COMEÇAR A FATURAR - R$ 47
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-10 py-5 text-lg hover-lift shadow-2xl"
            >
              👑 ACESSO VIP + GRUPO EXCLUSIVO - R$ 97
            </Button>
          </div>

          <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-500/10 rounded-full animate-float blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-500/10 rounded-full animate-float-delayed blur-xl"></div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#0d0d0d] relative" id="videos" data-animate>
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2300ffff' fillOpacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2
            className={`font-serif text-4xl font-bold text-center mb-4 ${isVisible.videos ? "animate-fade-in-up" : "opacity-0"}`}
          >
            Veja Como Pedro Faturou{" "}
            <span className="gold-accent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              R$ 9.300 em Uma Semana
            </span>
          </h2>
          <p
            className={`text-xl text-gray-300 text-center mb-12 ${isVisible.videos ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
          >
            Assista aos bastidores REAIS de como o método SMC gera resultados consistentes (mesmo para iniciantes)
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className={`bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg overflow-hidden hover-lift group ${isVisible.videos ? "animate-scale-in animate-delay-100" : "opacity-0"}`}
            >
              <div className="relative">
                <video
                  controls
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  poster="/trading-setup-1.jpg"
                >
                  <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/V%C3%ADdeo%20do%20WhatsApp%20de%202025-08-16%20%C3%A0%28s%29%2022.12.34_fab11119-9BwTCz2lwXYNYZM7FbqectWo4bJxTg.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-cyan-400">O Segredo dos R$ 9.300</h3>
                <p className="text-gray-400 text-sm">
                  Como Pedro identifica setups que geram até 300% de lucro em uma única operação
                </p>
              </div>
            </div>

            <div
              className={`bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg overflow-hidden hover-lift group ${isVisible.videos ? "animate-scale-in animate-delay-200" : "opacity-0"}`}
            >
              <div className="relative">
                <video
                  controls
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  poster="/trading-setup-2.jpg"
                >
                  <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/V%C3%ADdeo%20do%20WhatsApp%20de%202025-08-16%20%C3%A0%28s%29%2022.12.14_e7aa55fc-Y2EIPP5Lwtdjeb0GLwmxzAkqbm4HaX.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-yellow-400">Lucro 5x maior em 7 dias</h3>
                <p className="text-gray-400 text-sm">
                  Pedro teve uma operação com $1.800 de lucro — 5x mais do que na semana anterior. Agora, revela o processo que usa no dia a dia.
                </p>
              </div>
            </div>

            <div
              className={`bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg overflow-hidden hover-lift group md:col-span-2 lg:col-span-1 ${isVisible.videos ? "animate-scale-in animate-delay-300" : "opacity-0"}`}
            >
              <div className="relative">
                <video
                  controls
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  poster="/pedro-coden-real.jpg"
                >
                  <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/V%C3%ADdeo%20do%20WhatsApp%20de%202025-08-16%20%C3%A0%28s%29%2022.12.34_e07e654b-BdoyXUVT5OrVi308HpHIg2QGhbLzy5.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-green-400">Estratégia dos Milionários</h3>
                <p className="text-gray-400 text-sm">
                  Como as instituições movimentam BILHÕES e como você pode "surfar" nesses movimentos
                </p>
              </div>
            </div>
          </div>

          <div
            className={`text-center mt-12 ${isVisible.videos ? "animate-fade-in-up animate-delay-500" : "opacity-0"}`}
          >
            <p className="text-lg text-gray-300 mb-6">Pronto para replicar esses resultados na sua conta?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-semibold px-8 py-4 hover-lift neon-glow"
              >
                🚀 SIM, QUERO FATURAR 
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-8 py-4 hover-lift"
              >
                👑 QUERO O ACESSO VIP COMPLETO AGORA
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#1a1a1a] relative" id="about" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`${isVisible.about ? "animate-fade-in-left" : "opacity-0"}`}>
              <h2 className="font-serif text-4xl font-bold mb-6" data-stagger>
                O Homem que Decodificou{" "}
                <span className="gold-accent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Wall Street
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed" data-stagger>
                Pedro Coden descobriu como as grandes instituições manipulam o mercado e criou um método para "surfar"
                nesses movimentos bilionários. Em apenas 3 anos, transformou uma conta de R$ 5.000 em mais de R$ 500.000
                usando exclusivamente Smart Money Concepts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center hover-scale group" data-stagger>
                  <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 icon-bounce group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="font-semibold text-cyan-400">R$ 500K+</div>
                  <div className="text-sm text-gray-400">Patrimônio Atual</div>
                </div>

                <div className="text-center hover-scale group" data-stagger>
                  <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 icon-bounce group-hover:scale-110 transition-transform">
                    <Award className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="font-semibold text-yellow-400">Método Único</div>
                  <div className="text-sm text-gray-400">Nunca Ensinado</div>
                </div>

                <div className="text-center hover-scale group" data-stagger>
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 icon-bounce group-hover:scale-110 transition-transform">
                    <Target className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="font-semibold text-green-400">92%</div>
                  <div className="text-sm text-gray-400">Taxa de Acerto</div>
                </div>
              </div>
            </div>

            <div
              className={`flex justify-center ${isVisible.about ? "animate-fade-in-right animate-float" : "opacity-0"}`}
            >
              <div className="relative hover-lift group">
                <img
                  src="/pedro-coden-real.jpg"
                  alt="Pedro Coden - Especialista em SMC"
                  className="rounded-lg shadow-2xl max-w-md w-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/50 backdrop-blur-sm">
                    🎯 Especialista em SMC
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#0d0d0d] relative" id="results" data-animate>
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2
            className={`font-serif text-4xl font-bold text-center mb-4 ${isVisible.results ? "animate-fade-in-up" : "opacity-0"}`}
          >
            Comprovantes REAIS:{" "}
            <span className="gold-accent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              R$ 127.000 em Lucros
            </span>
          </h2>
          <p
            className={`text-xl text-gray-300 text-center mb-12 ${isVisible.results ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
          >
            Prints REAIS da conta, extratos bancários e comprovantes que NINGUÉM pode contestar
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className={`bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg overflow-hidden hover-lift group ${isVisible.results ? "animate-scale-in animate-delay-100" : "opacity-0"}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src="/trading-setup-1.jpg"
                  alt="Setup de Trading SMC"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-cyan-400">📊 Setup Estratégico para Traders</h3>
                <p className="text-gray-400 text-sm">
                  Estratégia de Pontos&nbsp;de&nbsp;liquidez aplicada em apenas uma operação bem-sucedida
                </p>
              </div>
            </div>

            <div
              className={`bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg overflow-hidden hover-lift group ${isVisible.results ? "animate-scale-in animate-delay-200" : "opacity-0"}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src="/trading-setup-2.jpg"
                  alt="Gráfico com SMC"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-green-400">🎯 Precisão Cirúrgica</h3>
                <p className="text-gray-400 text-sm">
                  Como Pedro identifica o ponto EXATO de entrada com 84% de precisão
                </p>
              </div>
            </div>

            <div
              className={`bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg overflow-hidden hover-lift group ${isVisible.results ? "animate-scale-in animate-delay-300" : "opacity-0"}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src="/pix-resultado.jpg"
                  alt="Comprovante Pix R$ 9.300"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-yellow-400">💰 Prova Irrefutável</h3>
                <p className="text-gray-400 text-sm">
                  R$ 9.300 em uma única transferência - resultado de 3 operações SMC
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-2xl mx-auto">
            <div
              className={`bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg overflow-hidden hover-lift group ${isVisible.results ? "animate-fade-in-up animate-delay-500" : "opacity-0"}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src="/carteira-crypto.jpg"
                  alt="Carteira de Criptomoedas - R$ 21.661,26"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-8 text-center">
                <h3 className="font-semibold text-3xl mb-2 text-green-400 animate-count-up">R$ 21.661,26</h3>
                <p className="text-gray-300 mb-4">
                  Portfolio ATUAL em tempo real com{" "}
                  <span className="text-green-400 font-semibold animate-pulse">+R$ 1.192,91 HOJE</span> (atualizado
                  automaticamente)
                </p>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-glow">
                  ✅ VERIFICADO EM TEMPO REAL
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 px-4 bg-[#1a1a1a]" id="learn" data-animate>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`font-serif text-4xl font-bold mb-4 ${isVisible.learn ? "animate-fade-in-up" : "opacity-0"}`}>
            Os Segredos de Wall Street que Vão{" "}
            <span className="gold-accent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Multiplicar Sua Conta
            </span>
          </h2>
          <p
            className={`text-xl text-gray-300 mb-12 ${isVisible.learn ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
          >
            Descubra como as instituições movimentam TRILHÕES e como você pode lucrar com isso (mesmo com pouco capital)
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`flex items-start gap-4 text-left hover-lift ${isVisible.learn ? "animate-slide-in-bottom animate-delay-100" : "opacity-0"}`}
            >
              <CheckCircle className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0 icon-bounce" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Como Ganhar R$ 5.000+ Por Mês</h3>
                <p className="text-gray-400">
                  O método EXATO para identificar movimentos de BILHÕES antes que aconteçam
                </p>
              </div>
            </div>

            <div
              className={`flex items-start gap-4 text-left hover-lift ${isVisible.learn ? "animate-slide-in-bottom animate-delay-200" : "opacity-0"}`}
            >
              <CheckCircle className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0 icon-bounce" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Mentalidade dos Milionários</h3>
                <p className="text-gray-400">Pensar como um trader profissional que opera com frieza cirúrgica</p>
              </div>
            </div>

            <div
              className={`flex items-start gap-4 text-left hover-lift ${isVisible.learn ? "animate-slide-in-bottom animate-delay-300" : "opacity-0"}`}
            >
              <CheckCircle className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0 icon-bounce" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Setups de R$ 10.000+</h3>
                <p className="text-gray-400">Como montar operações que podem render 5 dígitos em uma única entrada</p>
              </div>
            </div>

            <div
              className={`flex items-start gap-4 text-left hover-lift ${isVisible.learn ? "animate-slide-in-bottom animate-delay-400" : "opacity-0"}`}
            >
              <CheckCircle className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0 icon-bounce" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Gestão de Risco Inteligente</h3>
                <p className="text-gray-400">
                  Estratégia projetada para minimizar perdas e preservar seu capital, mesmo em cenários de alta volatilidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 px-4 bg-[#1a1a1a]" id="pricing" data-animate>
        <div className="max-w-5xl mx-auto">
          <h2
            className={`font-serif text-4xl font-bold text-center mb-4 ${isVisible.pricing ? "animate-fade-in-up" : "opacity-0"}`}
          >
            Invista R$ 47 agora e{" "}
            <span className="gold-accent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              {"conquiste uma renda extra mensal!"} 
            </span>
          </h2>
          <p
            className={`text-xl text-gray-300 text-center mb-12 ${isVisible.pricing ? "animate-fade-in-up animate-delay-200" : "opacity-0"}`}
          >
            Não é mágica, é estratégia: R$ 47 que podem render muito mais.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card
              className={`bg-[#2a2a2a] border-gray-700 relative card-hover ${isVisible.pricing ? "animate-scale-in animate-delay-300" : "opacity-0"}`}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <BarChart3 className="w-6 h-6 text-cyan-400 icon-bounce" />
                  <CardTitle className="text-2xl font-serif">Plano Essencial</CardTitle>
                </div>
                <div className="text-4xl font-bold text-cyan-400 mb-2 animate-pulse-slow">R$ 47</div>
                <p className="text-gray-400">Método completo que já gerou R$ 500K+</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 hover-scale">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Método COMPLETO que gerou R$ 500.000</span>
                </div>
                <div className="flex items-center gap-3 hover-scale">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>+30 aulas com setups de R$ 10.000+</span>
                </div>
                <div className="flex items-center gap-3 hover-scale">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Setups que Pedro usa para ganhar R$ 9.300/mês</span>
                </div>
                <div className="flex items-center gap-3 hover-scale">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Acesso VITALÍCIO (valor real: R$ 1.997)</span>
                </div>

                <Button className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 hover-lift neon-glow">
                  QUERO COMEÇAR A LUCRAR   
                </Button>
              </CardContent>
            </Card>

            <Card
              className={`bg-gradient-to-br from-[#2a2a2a] to-[#3a3a3a] border-yellow-500/50 relative card-hover ${isVisible.pricing ? "animate-scale-in animate-delay-500" : "opacity-0"}`}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 animate-pulse-slow">
                <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold px-4 py-1">
                  🔥 MAIS POPULAR
                </Badge>
              </div>
              <CardHeader className="text-center pb-4 pt-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-yellow-400 icon-bounce" />
                  <CardTitle className="text-2xl font-serif">Plano VIP</CardTitle>
                </div>
                <div className="text-4xl font-bold text-yellow-400 mb-2 animate-pulse-slow">R$ 97</div>
                <p className="text-gray-400">Plano Essencial + Grupo VIP + Setup Pessoal do Pedro</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-yellow-400 font-semibold mb-3">
                  ✨ Tudo do Essencial + Acesso aos BASTIDORES +
                </div>

                <div className="flex items-center gap-3 hover-scale">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Setup PESSOAL do Pedro (nunca revelado - valor R$ ) </span>
                </div>
                <div className="flex items-center gap-3 hover-scale">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Grupo VIP: receba os setups de Pedro EM TEMPO REAL</span>
                </div>
                <div className="flex items-center gap-3 hover-scale">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Alertas dos movimentos de R$ 10.000+ antes que aconteçam</span>
                </div>
                <div className="text-sm text-gray-400 mt-4">
                  Grupo VIP: apenas R$ 47/mês (cancelável a qualquer momento)
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 hover-lift">
                  QUERO O ACESSO VIP COMPLETO AGORA
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Guarantee and Urgency Section */}
      <section className="py-20 px-4 bg-[#0d0d0d]" id="guarantee" data-animate>
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`bg-[#1a1a1a] rounded-lg p-8 mb-12 hover-lift ${isVisible.guarantee ? "animate-scale-in" : "opacity-0"}`}
          >
            <Shield className="w-16 h-16 text-green-400 mx-auto mb-4 animate-float icon-bounce" />
            <h3 className="text-2xl font-bold mb-4">Garantia BLINDADA de 7 Dias</h3>
            <p className="text-lg text-gray-300">
              Se você não conseguir identificar pelo menos 3 setups lucrativos nos primeiros 7 dias, devolvemos 100% do
              seu dinheiro. SEM perguntas, SEM burocracia.
            </p>
          </div>

          <div
            className={`bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-lg p-8 hover-lift ${isVisible.guarantee ? "animate-slide-in-bottom animate-delay-300" : "opacity-0"}`}
          >
            <Clock className="w-12 h-12 text-red-400 mx-auto mb-4 animate-pulse-slow" />
            <h3 className="text-2xl font-bold mb-4 text-red-400">⚠️ ÚLTIMAS 24 HORAS - Oferta Expira HOJE</h3>
            <p className="text-lg text-gray-300 mb-6">
              Depois de amanhã, este método custará R$ 197. Esta é sua ÚNICA chance de pegar por R$ 47:
            </p>

            <div className="flex justify-center gap-4 text-center">
              <div className="bg-black/50 rounded-lg p-4 min-w-[80px] hover-scale">
                <div className="text-3xl font-bold countdown-timer animate-count-up">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-400">Horas</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 min-w-[80px] hover-scale">
                <div className="text-3xl font-bold countdown-timer animate-count-up">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-400">Minutos</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 min-w-[80px] hover-scale">
                <div className="text-3xl font-bold countdown-timer animate-count-up">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-400">Segundos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-gray-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/footer-bg.jpg" alt="Footer Background" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/90 to-[#1a1a1a]/70"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
          <div className="mb-6">
            <h4 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">
              Pedro Coden
            </h4>
            <p className="text-gray-300 text-lg">
              Especialista em Smart Money Concepts. Transformando traders em profissionais desde 2021.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6 space-y-4 text-sm text-gray-400">
            <p className="backdrop-blur-sm bg-black/20 rounded-lg p-4">
              <strong className="text-yellow-400">⚠️ Aviso legal:</strong> Este curso é para fins educacionais.
              Resultados passados não garantem ganhos futuros. Trading envolve riscos.
            </p>
            <p className="text-gray-500">© 2025 Pedro Coden – Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
