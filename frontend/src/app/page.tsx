'use client';

import * as React from 'react';
import '@/lib/env';

import ButtonLink from '@/components/links/ButtonLink';

import DataTable from '@/components/dataTable/DataTable';

export default function HomePage() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <p className='mt-2 text-sm text-gray-800'>
  
          </p>

          <DataTable />
          {/* <ButtonLink className='mt-6' href='/components' variant='light'>
            See all included components
          </ButtonLink> */}

        </div>
      </section>
    </main>
  );
}
