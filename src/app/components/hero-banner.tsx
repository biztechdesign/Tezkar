import { ImageWithFallback } from "./figma/ImageWithFallback";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Slide = { image: string; alt: string };

function HeroPanel({ slides, autoplaySpeed }: { slides: Slide[]; autoplaySpeed: number }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed,
    pauseOnHover: true,
    arrows: false,
    customPaging: () => (
      <div
        className="w-3 h-3 bg-white/50 hover:bg-white transition-colors mt-4"
        style={{ borderRadius: "0px" }}
      />
    ),
    dotsClass: "slick-dots !bottom-4",
  };

  return (
    <div className="relative overflow-hidden w-full hero-banner-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="hero-slide-item" style={{ cursor: "pointer" }}>
            <ImageWithFallback
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export function HeroBanner() {
  const leftSlides: Slide[] = [
    {
      image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=1400&h=600&fit=crop",
      alt: "Custom Printed T-Shirts with Logo",
    },
    {
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1400&h=600&fit=crop",
      alt: "Branded Custom Mugs with Company Logo",
    },
    {
      image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=1400&h=600&fit=crop",
      alt: "Personalized Branded Caps",
    },
    {
      image: "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?w=1400&h=600&fit=crop",
      alt: "Custom Printed Tote Bags",
    },
    {
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1400&h=600&fit=crop",
      alt: "Engraved Corporate Pens",
    },
  ];

  const rightSlides: Slide[] = [
    {
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1400&h=600&fit=crop",
      alt: "Custom Branded Water Bottles",
    },
    {
      image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1400&h=600&fit=crop",
      alt: "Personalized Notebooks and Planners",
    },
    {
      image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=1400&h=600&fit=crop",
      alt: "Custom USB Drives with Logo",
    },
    {
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=1400&h=600&fit=crop",
      alt: "Branded Hoodies and Apparel",
    },
    {
      image: "https://images.unsplash.com/photo-1544816565-aa8c1166648f?w=1400&h=600&fit=crop",
      alt: "Custom Printed Lanyards and Keychains",
    },
  ];

  return (
    <section
      className="relative w-full bg-white py-6"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <HeroPanel slides={leftSlides} autoplaySpeed={4000} />
          <HeroPanel slides={rightSlides} autoplaySpeed={5000} />
        </div>
      </div>

      <style>{`
        .hero-banner-slider {
          line-height: 0;
          font-size: 0;
        }
        .hero-banner-slider .slick-list,
        .hero-banner-slider .slick-track,
        .hero-banner-slider .slick-slide,
        .hero-banner-slider .slick-slide > div {
          line-height: 0;
          font-size: 0;
        }
        .hero-banner-slider .hero-slide-item {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
          cursor: pointer;
        }
        .hero-banner-slider .slick-slide,
        .hero-banner-slider .slick-slide > div,
        .hero-banner-slider .slick-slide img {
          cursor: pointer;
        }
        .hero-banner-slider .slick-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-banner-slider .slick-dots {
          bottom: 16px;
        }
        .hero-banner-slider .slick-dots li {
          margin: 0 3px;
        }
        .hero-banner-slider .slick-dots li button:before {
          display: none;
        }
        .hero-banner-slider .slick-dots li div {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.55);
        }
        .hero-banner-slider .slick-dots li.slick-active div {
          background: #ffffff;
        }
      `}</style>
    </section>
  );
}
