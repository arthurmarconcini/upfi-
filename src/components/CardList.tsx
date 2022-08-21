import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    setSelectedImageUrl(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={2} spacing={10}>
        {cards.map(card => (
          <Card
            key={card.id}
            data={card}
            viewImage={url => handleViewImage(url)}
          />
        ))}
      </SimpleGrid>
      {/* TODO CARD GRID */}

      {/* TODO MODALVIEWIMAGE */}
      {isOpen && (
        <ModalViewImage
          isOpen={isOpen}
          onClose={onClose}
          imgUrl={selectedImageUrl}
        />
      )}
    </>
  );
}
