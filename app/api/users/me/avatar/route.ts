import { cookies } from 'next/headers';
import FormData from 'form-data';

import { NextResponse } from 'next/server';
import { api } from '../../../api';

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const formData = await req.formData();
    const file = formData.get('avatar') as File;

    const backendFormData = new FormData();
    backendFormData.append(
      'avatar',
      Buffer.from(await file.arrayBuffer()),
      file.name,
    );

    const { data } = await api.put('/users/me/avatar', backendFormData, {
      headers: {
        ...backendFormData.getHeaders(),
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
