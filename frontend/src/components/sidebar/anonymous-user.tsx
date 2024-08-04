import Image from 'next/image'
import React from 'react'

const AnonymousUserImage: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div
    className="cursor-pointer overflow-hidden rounded-full"
    onClick={onClick}
  >
    <Image
      src="/profile-picture.png"
      alt="Descrição da imagem"
      width={125}
      height={125}
      className="rounded-full"
    />
  </div>
)

export default AnonymousUserImage
