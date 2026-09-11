import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    titulo: "ESTILO QUE TE DEFINE",
    subtitulo:
      "Descubre las mejores prendas para hombre, mujer y niños con envío inmediato.",
    etiqueta: "🔥 NUEVA COLECCIÓN 2026",
    boton: "Comprar ahora",
    imagen:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900",
  },

  {
    id: 2,
    titulo: "DESCUENTOS HASTA 50%",
    subtitulo:
      "Las mejores promociones en ropa, zapatos y accesorios originales.",
    etiqueta: "💥 OFERTAS",
    boton: "Ver promociones",
    imagen:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900",
  },

  {
    id: 3,
    titulo: "NUEVA TEMPORADA",
    subtitulo:
      "Colección exclusiva para toda la familia con las mejores marcas.",
    etiqueta: "⭐ PREMIUM",
    boton: "Explorar",
    imagen:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900",
  },

  {
    id: 4,
    titulo: "ENVÍO GRATIS",
    subtitulo: "Recibe tus pedidos en cualquier ciudad de Colombia.",
    etiqueta: "🚚 ENVÍOS",
    boton: "Comprar",
    imagen:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900",
  },
];

function HeroSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            style={{
              height: "420px",
              background:
                "linear-gradient(90deg,#0f172a 0%,#312e81 45%,#7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "60px",
              color: "#fff",
            }}
          >
            {/* Texto */}
            <div style={{ maxWidth: "500px" }}>
              <span
                style={{
                  background: "#ffffff22",
                  padding: "8px 16px",
                  borderRadius: "30px",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                {slide.etiqueta}
              </span>

              <h1
                style={{
                  fontSize: "58px",
                  marginTop: "25px",
                  marginBottom: "15px",
                  lineHeight: "1.05",
                }}
              >
                {slide.titulo}
              </h1>

              <p
                style={{
                  fontSize: "18px",
                  opacity: ".9",
                  marginBottom: "35px",
                }}
              >
                {slide.subtitulo}
              </p>

              <button
                style={{
                  background: "#7c3aed",
                  color: "#fff",
                  border: "none",
                  padding: "16px 35px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "15px",
                }}
              >
                {slide.boton} →
              </button>
            </div>

            {/* Imagen */}
            <img
              src={slide.imagen}
              alt={slide.titulo}
              style={{
                height: "340px",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSlider;
