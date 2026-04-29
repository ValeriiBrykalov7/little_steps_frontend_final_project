import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { WeekSelector } from '@/components/WeekSelector/WeekSelector';

type Props = {
  params: {
    weekNumber: string;
  };
};

export default function JourneyPage({ params }: Props) {
  const weekNumber = Number(params.weekNumber);

  return (
    <div className='journeyWeek'>
      <GreetingBlock />
      <WeekSelector currentWeek={weekNumber} />
      <JourneyDetails weekNumber={weekNumber} />
    </div>
  );
}
