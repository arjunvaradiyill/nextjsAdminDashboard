import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className="flex text-xl md:text-2xl">
        <li className="flex items-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-gray-500 hover:text-gray-900"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
            <Link
              href={breadcrumb.href}
              className={clsx(
                'ml-1 text-sm font-medium md:text-base',
                breadcrumb.active
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-900',
              )}
              aria-current={breadcrumb.active ? 'page' : undefined}
            >
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
