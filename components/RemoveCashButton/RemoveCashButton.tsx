'use client';

import { useQueryClient } from '@tanstack/react-query';

export function ClearCacheButton() {
  const queryClient = useQueryClient();

  return <button onClick={() => queryClient.clear()}>Clear query cache</button>;
}
