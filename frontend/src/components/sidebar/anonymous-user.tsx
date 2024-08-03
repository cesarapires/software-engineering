import Image from 'next/image';
import React from 'react';

const AnonymousUserImage: React.FC = () => (
  <div className='rounded-full overflow-hidden'>
    <Image
      src="/profile-picture.png"
      alt="Descrição da imagem"
      width={125}
      height={125} 
      className="rounded-full"
    />
  </div>
);

export default AnonymousUserImage;