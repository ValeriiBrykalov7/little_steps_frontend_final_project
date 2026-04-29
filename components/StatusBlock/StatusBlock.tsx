import css from './StatusBlock.module.css';
export type StatusBlockProps = {
  daysToMeeting: number;
  currentWeek: number;
};

const StatusBlock = ({ daysToMeeting, currentWeek }: StatusBlockProps) => {
  return (
    <div className={` ${css.status_block}`}>
      <div className={css.status}>
        <h3 className={css.status_text_name}>Тиждень</h3>
        <h2 className={css.status_text}>{currentWeek}</h2>
      </div>
      <div className={css.status}>
        <h3 className={css.status_text_name}>Днів до зустрічі</h3>
        <h2 className={css.status_text}>~{daysToMeeting}</h2>
      </div>
    </div>
  );
};

export default StatusBlock;
