"use client";
import { useState } from 'react';
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import PostMetadata from "@/components/PostMetadata";
import { ApplicationLogger, LoggerFunction, LoggerLevel, Logger } from 'simple-logging-system';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

// Define las props que espera el componente Landing
interface LandingProps {
  posts: PostMetadata[];
}

const Landing: React.FC<LandingProps> = ({ posts }) => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'rolmovel@gmail.com',
          subject: 'Nuevo mensaje desde tu web',
          text: message,
        }),
      });

      const result = await response.json();
      setResponseMessage(result.message);

      if (response.ok) {
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      setResponseMessage('Error al enviar el correo. Inténtalo de nuevo.');
    }
  };

  return (


    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-[#FFC107] text-[#333] px-4 lg:px-6 py-4 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <PlaneIcon className="h-6 w-6" />
          <span className="text-xl font-bold">Viaja a tu aire</span>
        </Link>
        <nav className="hidden lg:flex gap-6">
          <Link href="#funciona" className="text-sm font-medium hover:underline" prefetch={false}>
            Cómo Funciona
          </Link>
          <Link href="#caracteristicas" className="text-sm font-medium hover:underline" prefetch={false}>
            Características
          </Link>
          <Link href="#ejemplos" className="text-sm font-medium hover:underline" prefetch={false}>
            Algunos ejemplos
          </Link>
          <Link href="#equipo" className="text-sm font-medium hover:underline" prefetch={false}>
            Nuestro Equipo
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="bg-[#FFC107] py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                Planificación de Viajes Personalizada y Sencilla
              </h1>
              <p className="text-lg text-[#333]">
                Simplemente envíanos tu idea de viaje y nuestro servicio impulsado por IA creará un itinerario a medida
                según tus necesidades.
              </p>
              <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <Textarea
                                placeholder="Describe tu idea de viaje aquí..."
                                className="flex-1"
                                value={message}
          			onChange={(e) => setMessage(e.target.value)}
                                required
                              />

                              <Input type="email" placeholder="Ingresa tu correo electrónico" className="flex-1" 
                              value={email} onChange={(e) => setEmail(e.target.value)}/>
                              <Button type="submit" variant="secondary">
                                <HotelIcon/>Planifica mi viaje
                              </Button>

              </form>
            </div>
            <img
              src="/placeholder.svg"
              width={600}
              height={400}
              alt="Planificación de Viajes"
              className="mx-auto rounded-xl object-cover"
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
            />
          </div>
        </section>
        <section id="funciona" className="py-12 md:py-24 lg:py-32 bg-[#F5F5F5]">
          <div className="container mx-auto px-4 md:px-6 grid gap-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Cómo Funciona Viaja a tu Aire</h2>
              <p className="max-w-[800px] text-[#666] md:text-xl/relaxed">
                Nuestro servicio impulsado por IA toma tu idea de viaje y la transforma en un itinerario personalizado,
                encargándose de toda la planificación por ti.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-4 text-center">
                <MailIcon className="h-12 w-12 text-[#FFC107]" />
                <h3 className="text-xl font-bold">Envía tu Idea</h3>
                <p className="text-[#666]">
                  Comparte tu idea de viaje con nosotros por correo electrónico y nuestro equipo se pondrá a trabajar.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <CogIcon className="h-12 w-12 text-[#FFC107]" />
                <h3 className="text-xl font-bold">Planificación con IA</h3>
                <p className="text-[#666]">
                  Nuestros agentes inteligentes analizan tu idea y generan un plan de viaje personalizado.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <CalendarCheckIcon className="h-12 w-12 text-[#FFC107]" />
                <h3 className="text-xl font-bold">Recibe tu Itinerario</h3>
                <p className="text-[#666]">
                  Obtén tu plan de viaje a medida, incluyendo destino, rutas, alojamiento y más.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="caracteristicas" className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 grid gap-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Características que Facilitan la Planificación de Viajes
              </h2>
              <p className="max-w-[800px] text-[#666] md:text-xl/relaxed">
                Viaja a tu Aire ofrece una suite de características para ayudarte a planificar tus vacaciones
                soñadas con facilidad.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-4">
                <MapPinIcon className="h-12 w-12 text-[#FFC107]" />
                <h3 className="text-xl font-bold">Recomendaciones de Destino</h3>
                <p className="text-[#666]">
                  Nuestro sistema de IA analiza tus preferencias y sugiere los mejores destinos para tu viaje.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <RouteIcon className="h-12 w-12 text-[#FFC107]" />
                <h3 className="text-xl font-bold">Itinerarios Optimizados</h3>
                <p className="text-[#666]">
                  Creamos rutas de viaje eficientes que maximizan tu tiempo y minimizan los inconvenientes.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <HotelIcon className="h-12 w-12 text-[#FFC107]" />
                <h3 className="text-xl font-bold">Reserva de Alojamiento</h3>
                <p className="text-[#666]">
                  Nuestra plataforma se integra con los principales proveedores de hoteles y alquileres vacacionales
                  para reservar tu estancia.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <PlaneIcon className="h-12 w-12 text-[#FFC107]" />
                <h3 className="text-xl font-bold">Reservas de Vuelo</h3>
                <p className="text-[#666]">
                  Nos encargamos de todas tus reservas de vuelo, asegurando los mejores precios y horarios.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <CarIcon className="h-12 w-12 text-[#FFC107]" />
                <h3 className="text-xl font-bold">Alquiler de Vehículos</h3>
                <p className="text-[#666]">
                  Alquila el vehículo perfecto para tu viaje a través de nuestro servicio integrado de alquiler de
                  coches.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <CalendarIcon className="h-12 w-12 text-[#FFC107]" />
                <h3 className="text-xl font-bold">Programación Personalizada</h3>
                <p className="text-[#666]">
                  Nuestro sistema de IA crea un programa detallado que optimiza tu tiempo y actividades.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="ejemplos" className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6  gap-12 space-y-8">

                      <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                          Estos son algunos ejemplos de nuestros viajes
                        </h2>
                        <p className="max-w-[800px] text-[#666] md:text-xl/relaxed">
                          Cuando nuestro equipo se pone a trabajar organiza experiencias inolvidables, aquí puedes
                          ver algunos de nuestros viajes
                        </p>
                      </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">

      <Carousel className="w-full max-w-4xl">
        <CarouselContent>
      {posts.map((post, index) => (
                <CarouselItem>
                  <div className="p-4 bg-[#F5F5F5] rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link href={post.slug} className="text-[#666] hover:text-[#FFC107]" prefetch={false}>
                      <img
                        src={post.image}
                        width={300}
                        height={200}
                        className="rounded-lg object-cover"
                        style={{ aspectRatio: "300/200", objectFit: "cover" }}
                      />
                      </Link>
                      <div>
                        <h3 className="text-xl font-bold">{post.title}</h3>
                        <p className="text-[#666]">
                            {post.resume}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

      ))}
         </CarouselContent>
         <CarouselPrevious />
         <CarouselNext />
      </Carousel>
          </div>
          </div>
        </section>
        <section id="equipo" className="py-12 md:py-24 lg:py-32 bg-[#F5F5F5]">
          <div className="container mx-auto px-4 md:px-6 grid gap-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Conoce al Equipo de Viaja a tu Aire
              </h2>
              <p className="max-w-[800px] text-[#666] md:text-xl/relaxed">
                Nuestro talentoso equipo de expertos en viajes e ingenieros de IA se dedica a hacer que tu experiencia
                de planificación de vacaciones sea excepcional.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-4 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" alt="Sara" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Sara</h3>
                <p className="text-[#666]">Co-Fundadora, experta en comunicacion y redes sociales</p>
                <div className="flex gap-2">
                  <Link href="#" className="text-[#666] hover:text-[#FFC107]" prefetch={false}>
                    <LinkedinIcon className="h-6 w-6" />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" alt="Rodrigo" />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Rodrigo</h3>
                <p className="text-[#666]">Co-Fundador y experto en tecnología</p>
                <div className="flex gap-2">
                  <Link href="#" className="text-[#666] hover:text-[#FFC107]" prefetch={false}>
                    <LinkedinIcon className="h-6 w-6" />
                  </Link>
                </div>
              </div>

                            <div className="flex flex-col items-center gap-4 text-center">
                              <Avatar className="w-20 h-20">
                                <AvatarImage src="/placeholder-user.jpg" alt="Chus" />
                                <AvatarFallback>MG</AvatarFallback>
                              </Avatar>
                              <h3 className="text-xl font-bold">Chus</h3>
                              <p className="text-[#666]">Nuestra experta en origanizar a todo el equipo</p>
                            </div>

              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" alt="Angel" />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Angel</h3>
                <p className="text-[#666]">Conoce todos los destinos, ¿quieres un viaje? El te lo busca</p>
              </div>

              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" alt="Jaime" />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Jaime</h3>
                <p className="text-[#666]">Lo sabe todo sobre historia, es como un libro abierto</p>
              </div>

              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" alt="Pura" />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Pura</h3>
                <p className="text-[#666]">Un hotel, un coche, avión... Nuestra superINTENDENTE</p>
              </div>


            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function CalendarCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  )
}


function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function CarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}


function CogIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>
  )
}


function HotelIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 22v-6.57" />
      <path d="M12 11h.01" />
      <path d="M12 7h.01" />
      <path d="M14 15.43V22" />
      <path d="M15 16a5 5 0 0 0-6 0" />
      <path d="M16 11h.01" />
      <path d="M16 7h.01" />
      <path d="M8 11h.01" />
      <path d="M8 7h.01" />
      <rect x="4" y="2" width="16" height="20" rx="2" />
    </svg>
  )
}


function LinkedinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}


function PlaneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  )
}


function RouteIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  )
}


function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

export default Landing;
