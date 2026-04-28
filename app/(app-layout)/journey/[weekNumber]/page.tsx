import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
// import WeekSelector from '@/components/WeekSelector';

type Props = {
  params: {
    weekNumber: string;
  };
};

export default function JourneyPage({ params }: Props) {
  const { weekNumber } = params;

  return (
    <div className=''>
      <GreetingBlock />
      <WeekSelector currentWeek={Number(weekNumber)} />
      <JourneyDetails weekNumber={Number(weekNumber)} />
    </div>
  );
}
