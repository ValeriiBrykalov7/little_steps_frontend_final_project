
import { useWeekStore } from "@/lib/store/weekStore";

const StatusBlock=()=>{
    const data = useWeekStore((state) => state.dashboardData);
  if (!data) return null;
    return (
        <div>
            <div>{data.daysToMeeting}</div>
            <div>{data.currentWeek}</div>
        </div>
    
    )
}
export default StatusBlock

