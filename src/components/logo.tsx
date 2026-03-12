import { cn } from '@/lib/utils';
import Image from 'next/image';
import { dataSite } from '@/lib/data';

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        className
      )}
    >
      {dataSite.logo ? (
        <Image
          src={dataSite.logo}
          alt={`${dataSite.shortName} logo`}
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
      ) : (
        <div className="h-10 w-10 bg-slate-900 rounded-lg" />
      )}
    </div>
  );
}
