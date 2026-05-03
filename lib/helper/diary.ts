
export const formatDiaryDate = (dateString?: string | Date) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};


export const getEmotionTitle = (emotion: string) => {
  const titles: Record<string, string> = {
    happy: "Щастя",
    sad: "Сум",
    calm: "Спокій",
    excited: "Захват",
    tired: "Втома",
 
  };
  return titles[emotion] || emotion;
};