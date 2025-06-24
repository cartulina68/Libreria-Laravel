import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Loan } from '@/types';

interface SuccessProps {
  loan: Loan;
}

export default function Success({ loan }: SuccessProps) {
  return (
    <AppLayout>
      <Head title="Préstamo Confirmado" />
      <div className="p-6">
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <h1 className="text-2xl font-bold">¡Préstamo Confirmado!</h1>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">{loan.book.title}</h2>
              <p className="text-gray-600">{loan.book.author.name}</p>

              <div className="space-y-2 text-left">
                <p>Fecha de inicio: {new Date(loan.start_date).toLocaleDateString()}</p>
                <p>Fecha de devolución: {new Date(loan.end_date).toLocaleDateString()}</p>
                <p>Duración: {loan.days} días</p>
                <p className="font-semibold">Total pagado: S/ {loan.total_price.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-x-4">
            <Button asChild variant="outline">
              <Link href={route('books.catalog')}>Volver al catálogo</Link>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
