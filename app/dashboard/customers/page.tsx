import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/search';

export const metadata: Metadata = {
  title: 'Customers',
};

interface PageProps {
  searchParams: {
    query?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <main className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </main>
  );
}