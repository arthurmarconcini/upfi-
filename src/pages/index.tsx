import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface ImageData {
  id: string;
  title: string;
  description: string;
  url: string;
  ts: number;
}

type fetchImagesResponse = {
  after: string | null;
  data: ImageData[];
};

export default function Home(): JSX.Element {
  async function fetchImages({
    pageParam = null,
  }): Promise<fetchImagesResponse> {
    const response = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });

    return response.data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.after || null,
  });

  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(image => image.data.flat());

    return formatted;
  }, [data]);

  // TODO RENDER LOADING SCREEN

  if (isLoading) {
    return <Loading />;
  }

  // TODO RENDER ERROR SCREEN

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}