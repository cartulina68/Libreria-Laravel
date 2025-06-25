import { FormEventHandler, useEffect, useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import HeadingSmall from '@/components/heading-small';
import { Card, CardContent } from '@/components/ui/card';
import { Book } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

interface BookWithAuthor extends Book {
  id: number;
  title: string;
  price_per_day: number;
  author: {
    name: string;
  };
}

interface CreateLoanProps {
  book: BookWithAuthor;
}

export default function Create({ book }: CreateLoanProps) {
  const today = new Date().toLocaleDateString('en-CA'); // formato YYYY-MM-DD

  const { data, setData, post, processing, errors } = useForm({
    start_date: today,
    end_date: '',
  });

  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (data.start_date && data.end_date) {
      const start = new Date(data.start_date);
      const end = new Date(data.end_date);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays);
      setTotalPrice(diffDays * book.price_per_day);
    }
  }, [data.start_date, data.end_date, book.price_per_day]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('loans.store', book.id));
  };

  return (
    <AppLayout>
      <Head title="Solicitar Préstamo" />
      <div className="p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <HeadingSmall
            title="Solicitar Préstamo"
            description="Selecciona las fechas para tu préstamo"
          />

          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author.name}</p>
                <p className="text-sm">Precio por día: S/ {book.price_per_day.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start_date">Fecha de inicio</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={data.start_date}
                  onChange={(e) => setData('start_date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                <InputError message={errors.start_date} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date">Fecha de devolución</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={data.end_date}
                  onChange={(e) => setData('end_date', e.target.value)}
                  min={data.start_date || new Date().toISOString().split('T')[0]}
                />
                <InputError message={errors.end_date} />
              </div>
            </div>

            {totalDays > 0 && (
              <Alert>
                <AlertCircleIcon />
                <AlertTitle>
                  <p className='font-bold'>Información del prestamo</p>
                </AlertTitle>
                <AlertDescription className='pt-3'>
                  <p>Precio por día: <b>S/ {book.price_per_day.toFixed(2)} días</b></p>
                  <p>Duración del préstamo: <b>{totalDays} días</b></p>
                  <p>
                    Total a pagar: <b>S/ {totalPrice.toFixed(2)}</b>
                  </p>
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={processing || totalDays === 0}>
              Continuar con el pago
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
