import JourneyPageContent from './JourneyPageContent';
import { createPageMetadata } from '@/lib/helper/metadata';

export const metadata = createPageMetadata({
  title: 'Подорож',
  description:
    'Відстежуйте тижні вагітності, розвиток малюка та зміни у тілі мами в додатку Лелека.',
  path: '/journey',
  imageAlt: 'Лелека - подорож вагітності',
});

export default function JourneyPage() {
  return <JourneyPageContent />;
}
