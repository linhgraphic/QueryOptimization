'use client';

import * as React from 'react';
import '@/lib/env';

import ButtonLink from '@/components/links/ButtonLink';

import Logo from '~/svg/Logo.svg';

export default function HomePage() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <Logo className='w-16' />
          <h1 className='mt-4'>Code challenge</h1>

          <p className='mt-2 text-sm text-gray-800'>
            You have complete freedom to present the data here.
          </p>

          <ButtonLink className='mt-6' href='/components' variant='light'>
            See all included components
          </ButtonLink>

        </div>
      </section>
    </main>
  );
}
