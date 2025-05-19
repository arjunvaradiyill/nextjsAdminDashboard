
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';

interface PageProps {
  searchParams: {
    query?: string;
    page?: string;
    success?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams.query || '';
  const currentPage = Number(searchParams.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
  const success = searchParams.success || '';

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      {/* Success message would normally go here */}
      {success && (
        <div className="mt-4 rounded-md bg-green-50 p-4 text-green-700">
          <p>
            {success === 'created' && 'Invoice created successfully!'}
            {success === 'updated' && 'Invoice updated successfully!'}
            {success === 'deleted' && 'Invoice deleted successfully!'}
          </p>
        </div>
      )}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}