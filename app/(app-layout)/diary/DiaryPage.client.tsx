"use client";

import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { DiaryEntry } from '@/types/diary';
import { Loader } from '@/components/Loader/Loader';
import DiaryEntryCard from '@/components/DiaryEntryCard/DiaryEntryCard';
import { useState } from "react";
import { useRouter } from "next/navigation";
import css from './DiaryPage.client.module.css';

const DiaryListClient = () => {
  const router = useRouter();

  const [selectedCard, setSelectedCard] = useState<DiaryEntry | null>(null);

  const handleClick = (card: DiaryEntry) => {
    const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 1440px)").matches;
    if (isDesktop) {
      setSelectedCard(card);
      console.log("Diary Entry Details");
    }else {
      router.push(`/diary/${card._id}`);
    }
  }
  const fetchDiaries = async () => {
      const response = await axios.get<DiaryEntry[]>("/api/diaries/allDiary");
      return response.data;
  }
  const { data, isLoading,isError,error  } = useQuery({
    queryKey: ['diaries'],
    queryFn: fetchDiaries,
  });
  return (
    <div>
        {isLoading && <Loader/>}
        {isError && <p>An error occurred: {error.message}</p>}
        {!isLoading && !isError && data?.length === 0 && (
            <p>Записів ще немає</p>
      )}
      <ul className={css.diaryList}>
         {data?.map((card) => (
            <DiaryEntryCard key={card._id} card={card} onClick={() => handleClick(card)} />
        ))}
      </ul>
       
    </div>
  );
};
export default DiaryListClient;


