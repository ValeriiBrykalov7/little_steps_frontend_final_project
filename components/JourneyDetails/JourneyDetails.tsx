/* eslint-disable @next/next/no-img-element */
'use client';

import css from './JourneyDetails.module.css';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/Loader/Loader';

type BabyData = {
  image: string;
  textBlocks: string[];
};

type MotherData = {
  feelings: string;
  tips: string[];
};

type JourneyData = {
  baby: BabyData;
  mother: MotherData;
  tasks: string[];
};

type Props = {
  weekNumber: number;
};

// 🔹 mock (потім заміниш на API)
async function fetchJourneyData(
  weekNumber: number,
  tab: string,
): Promise<JourneyData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        baby: {
          image: '/baby.png',
          textBlocks: [
            `Тиждень ${weekNumber}: малюк росте`,
            'Формуються внутрішні органи',
          ],
        },
        mother: {
          feelings: 'Можлива втома, емоційні коливання',
          tips: ['Більше відпочивайте', 'Слідкуйте за водним балансом'],
        },
        tasks: ['Візит до лікаря', 'Аналізи'],
      });
    }, 1000);
  });
}

export default function JourneyDetails({ weekNumber }: Props) {
  const [activeTab, setActiveTab] = useState<'baby' | 'mother'>('baby');
  const [data, setData] = useState<JourneyData | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 запит при зміні тижня або табу
  useEffect(() => {
    fetchJourneyData(weekNumber, activeTab).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [weekNumber, activeTab]);

  return (
    <div>
      {/* Tabs */}
      <div className='flex gap-6 border-b mb-4'>
        <button
          onClick={() => {
            setActiveTab('baby');
            setLoading(true);
          }}
          className={`pb-2 ${
            activeTab === 'baby' ? 'border-b-2 border-black' : ''
          }`}
        >
          Розвиток малюка
        </button>

        <button
          onClick={() => {
            setActiveTab('mother');
            setLoading(true);
          }}
          className={`pb-2 ${
            activeTab === 'mother' ? 'border-b-2 border-black' : ''
          }`}
        >
          Тіло мами
        </button>
      </div>

      {/* Loader + Content */}
      {loading ? (
        <div className='h-[300px] flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        data && (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {activeTab === 'baby' && (
              <div className='p-4 border rounded-2xl h-auto lg:h-[400px] overflow-y-auto'>
                <img
                  src={data.baby.image}
                  alt='baby'
                  className='w-full h-48 object-cover mb-4'
                />

                {data.baby.textBlocks.map((text, i) => (
                  <p key={i} className='mb-2'>
                    {text}
                  </p>
                ))}
              </div>
            )}

            {activeTab === 'mother' && (
              <div className='space-y-4'>
                <div className='p-4 border rounded-2xl h-auto lg:h-[200px] overflow-y-auto'>
                  <h3 className='font-semibold mb-2'>
                    Як ви можете почуватись
                  </h3>
                  <p>{data.mother.feelings}</p>
                </div>

                <div className='p-4 border rounded-2xl h-auto lg:h-[200px] overflow-y-auto'>
                  <h3 className='font-semibold mb-2'>
                    Поради для вашого комфорту
                  </h3>
                  <ul className='list-disc pl-4'>
                    {data.mother.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className='p-4 border rounded-2xl'>
                  <h3 className='font-semibold mb-2'>Важливі завдання</h3>
                  <ul className='list-disc pl-4'>
                    {data.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
