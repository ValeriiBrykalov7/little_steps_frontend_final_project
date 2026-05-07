import DiaryPageClient from '../DiaryPageClient';
import { createPageMetadata } from '@/lib/helper/metadata';

type DiaryCurrentPageProps = {
  params: Promise<{
    entryId: string;
  }>;
};

export async function generateMetadata({ params }: DiaryCurrentPageProps) {
  const { entryId } = await params;

  return createPageMetadata({
    title: 'Запис щоденника',
    description:
      'Переглядайте, редагуйте або видаляйте особистий запис у щоденнику вагітності Лелека.',
    path: `/diary/${entryId}`,
    imageAlt: 'Лелека - запис щоденника',
  });
}

export default async function DiaryCurrentPage({
  params,
}: DiaryCurrentPageProps) {
  const { entryId } = await params;

  return <DiaryPageClient entryId={entryId} />;
}
