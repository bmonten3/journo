// /components/Submit.tsx
'use client';

import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

const Submit = ({ label, ...btnProps }: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
      {...btnProps}
      type="submit"
      isLoading={pending}
    >
      {label}
    </Button>
  );
};

export default Submit;
