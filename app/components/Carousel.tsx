import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

export function Carousel({
  dots = true,
  infinite = true,
  speed = 500,
  slidesToShow = 3,
  slidesToScroll = 1,
  responsive = [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ],
  ...props
}: React.ComponentPropsWithoutRef<typeof Slider>) {
  return (
    <Slider
      dots={dots}
      infinite={infinite}
      speed={speed}
      slidesToShow={slidesToShow}
      slidesToScroll={slidesToScroll}
      responsive={responsive}
      {...props}
    />
  )
}
