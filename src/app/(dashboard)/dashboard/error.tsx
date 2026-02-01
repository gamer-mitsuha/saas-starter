'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-destructive">Something went wrong!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            We encountered an error while loading your dashboard. Please try again.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 max-h-[200px] overflow-auto rounded bg-muted p-2 text-xs font-mono">
              {error.message}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => reset()} className="w-full">
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
