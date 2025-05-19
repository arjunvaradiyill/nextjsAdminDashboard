'use client';

import { useEffect, useState } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SuccessNotification({ successType }: { successType: string }) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setVisible(false);
    
    // Remove success query param while keeping other params
    const params = new URLSearchParams(searchParams);
    params.delete('success');
    const newParams = params.toString();
    const newPath = newParams ? `${pathname}?${newParams}` : pathname;
    
    router.replace(newPath);
  };
  
  if (!visible) return null;
  
  const messages = {
    created: 'Invoice created successfully!',
    updated: 'Invoice updated successfully!',
    deleted: 'Invoice deleted successfully!',
  };
  
  const message = messages[successType as keyof typeof messages] || 'Operation successful!';
  
  return (
    <div className="mb-4 animate-fade-in-down">
      <div className="rounded-md bg-green-50 p-4 shadow-md">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="h-5 w-5 text-green-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">{message}</p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={handleClose}
                className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 