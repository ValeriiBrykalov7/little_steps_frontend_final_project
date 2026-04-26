type StatusBlockProps = {
  daysToMeeting: number;
  currentWeek: number;
};

const StatusBlock = ({ daysToMeeting, currentWeek }: StatusBlockProps) => {
  return (
    <div>
      <div>{daysToMeeting}</div>
      <div>{currentWeek}</div>
    </div>
  );
};

export default StatusBlock;
