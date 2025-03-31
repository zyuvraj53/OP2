// components/Card.tsx
import Image from 'next/image';

const AboutUsCard = ({
  imageSrc = "https://via.placeholder.com/150",
  name = "John Doe",
  designation = "Senior Developer"
}) => {
  return (
    <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc}
          alt={`${name}'s profile`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="mt-2 text-gray-600">{designation}</p>
      </div>
    </div>
  );
};

export default AboutUsCard;