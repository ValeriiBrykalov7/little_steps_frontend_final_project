'use client';
import { useEffect, useRef, useState } from 'react';
import css from './WeekSelector.module.css';
import { useRouter } from 'next/navigation';


interface Props {
    initialWeek: number;
}

export const WeekSelector = ({ initialWeek }: Props) => {
    const router = useRouter();
    const [selectedWeek, setSelectedWeek] = useState<number>(initialWeek);
    const activeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        activeRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }, [selectedWeek]);

    function handleWeekClick(week: number) {
        setSelectedWeek(week);
        router.push(`/journey/${week}`);
    }

    function renderButtons() {
        const weeks = [];
        for (let i = 1; i <= 40; i++) {
            if (i > initialWeek) {
                weeks.push(
                    <button key={i} className={`${css.future} ${css.weekbox}`} disabled>
                        <div className={css.text}>
                            <div className={css.textfornumver}>{i}</div> Тиждень
                        </div>
                    </button>
                );
            } else {
                weeks.push(
                    <button
                        key={i}
                        ref={selectedWeek === i ? activeRef : null}
                        className={`${selectedWeek === i ? css.active : css.lastActive} ${css.weekbox}`}
                        onClick={() => handleWeekClick(i)}
                    >
                        <div className={css.text}>
                            <div className={css.textfornumver}>{i}</div> Тиждень
                        </div>
                    </button>
                );
            }
        }
        return weeks;
    }

    return <div className={css.weekSelector}>{renderButtons()}</div>;
};