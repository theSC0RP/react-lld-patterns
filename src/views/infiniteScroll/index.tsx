import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNotificationList } from "../../context/NotificationListContext";
import { nanoid } from "nanoid";
import Loader from "../../components/Loader";

type IImage = {
  url: string;
  id: string;
  height: number;
  width: number;
  aspectRatio: number;
};

const InfiniteScrollView = () => {
  const [query, setQuery] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [images, setImages] = useState<IImage[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const lastImageRef = useRef<HTMLDivElement | null>(null);
  const { addNotification } = useNotificationList();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isFetching) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && page <= totalPages && query) {
          fetchPhotos();
        }
      },
      { threshold: 1.0 }
    );
    if (lastImageRef.current) {
      observerRef.current.observe(lastImageRef.current);
    }
    return () => observerRef.current?.disconnect();
  }, [isFetching, page]);

  const fetchPhotos = async (isManual: boolean = false) => {
    if (query) {
      setIsFetching(true);
      try {
        const currentPage = isManual ? 1 : page;
        const API_KEY = import.meta.env.VITE_UNSPLASH_CLIENT_ID
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?&query=${query}&page=${currentPage}&per_page=15&client_id=${API_KEY}`
        );

        if (response.status === 200) {
          const data = response.data;
          const images = data.results;

          const imageObjects = images.map((image: any) => {
            return {
              url: image.urls.small,
              id: image.id,
              height: image.height,
              width: image.width,
              aspectRatio: image.width / image.height,
            } as IImage;
          });

          setTotalPages(data.total_pages);
          setImages((prev) => {
            return isManual ? imageObjects : [...prev, ...imageObjects];
          });
          setPage((prev) => (isManual ? 1 : prev + 1));
        } else {
          console.error(response);
          throw "Images could not be fetched";
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    } else {
      addNotification({
        id: nanoid(),
        message: "Search Query Absent",
        description: "Please enter a search query to load images.",
        position: "top-right",
        type: "danger",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-78px)]">
      <div className="flex w-full justify-between mb-4">
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
          }}
          value={query}
          name="query"
          className="w-[90%] rounded-md"
        />
        <Button
          className="bg-blue-500 px-6"
          onClick={() => fetchPhotos(true)}
          disabled={isFetching}
        >
          Get Images
        </Button>
      </div>

      <div className="flex-1 overflow-y-scroll no-scrollbar">
        {images.length ? (
          <div className="flex flex-wrap">
            {images.map((image, i) => {
              return (
                <div
                  key={i}
                  className="p-2 m-1 max-h-[300px]"
                  ref={i === images.length - 1 ? lastImageRef : null}
                >
                  <img
                    src={image.url}
                    className={`rounded-md h-[280px] w-[calc(${Math.round(
                      image.height * image.aspectRatio
                    )})] object-cover bg-gray-200 transition border-1 border-gray-950 duration-200 ease-in hover:drop-shadow-2xl hover:drop-shadow-gray-950`}
                    alt="fetched"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-200 flex flex-1 justify-center items-center h-full w-full">
            Search for your favorite images!
          </div>
        )}
        {isFetching && <Loader />}
      </div>
    </div>
  );
};

export default InfiniteScrollView;
