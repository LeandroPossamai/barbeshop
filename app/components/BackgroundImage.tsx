// components/BackgroundImage.js
import Image from 'next/image';

const BackgroundImage = ({ src }) => {
  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={75}
        priority
        className="z-[-1]" // Garante que a imagem fique atrás do conteúdo
      />
    </div>
  );
};

export default BackgroundImage;
