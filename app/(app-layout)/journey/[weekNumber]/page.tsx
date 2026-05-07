import JourneyPageContent from '../JourneyPageContent';
import { createPageMetadata } from '@/lib/helper/metadata';

type JourneyWeekPageProps = {
  params: Promise<{
    weekNumber: string;
  }>;
};

export async function generateMetadata({ params }: JourneyWeekPageProps) {
  const { weekNumber } = await params;
  const selectedWeek = Number(weekNumber);
  const title = Number.isFinite(selectedWeek)
    ? `${selectedWeek} тиждень вагітності`
    : 'Тиждень вагітності';

  return createPageMetadata({
    title,
    description:
      'Дізнавайтеся про розвиток малюка, самопочуття мами та корисні поради для обраного тижня вагітності.',
    path: `/journey/${weekNumber}`,
    imageAlt: 'Лелека - тиждень вагітності',
  });
}

export default async function JourneyWeekPage({
  params,
}: JourneyWeekPageProps) {
  const { weekNumber } = await params;
  const selectedWeek = Number(weekNumber);

  return <JourneyPageContent selectedWeek={selectedWeek} />;
}
