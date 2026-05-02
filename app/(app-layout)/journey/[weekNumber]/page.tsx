'use client';

import { useParams } from 'next/navigation';
import JourneyPageContent from '../JourneyPageContent';

export default function JourneyWeekPage() {
  const params = useParams<{ weekNumber: string }>();
  const selectedWeek = Number(params.weekNumber);

  return <JourneyPageContent selectedWeek={selectedWeek} />;
}
