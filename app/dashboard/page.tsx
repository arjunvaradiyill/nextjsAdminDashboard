import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchRevenue,
  fetchCardData,
  fetchLatestInvoices,
} from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense>
      
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChartWrapper />
        </Suspense>
        
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoicesWrapper />
        </Suspense>
      </div>
    </main>
  );
}

async function CardWrapper() {
  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers" />
    </div>
  );
}

async function RevenueChartWrapper() {
  try {
    const revenue = await fetchRevenue();
    return <RevenueChart revenue={revenue} />;
  } catch (error) {
    return (
      <div className="w-full md:col-span-4">
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="text-sm text-gray-500">
            Revenue data unavailable. Please run the seed API to populate data.
          </div>
        </div>
      </div>
    );
  }
}

async function LatestInvoicesWrapper() {
  try {
    const latestInvoices = await fetchLatestInvoices();
    return <LatestInvoices latestInvoices={latestInvoices} />;
  } catch (error) {
    return (
      <div className="flex w-full flex-col md:col-span-4">
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="text-sm text-gray-500">
            Invoice data unavailable. Please run the seed API to populate data.
          </div>
        </div>
      </div>
    );
  }
}
