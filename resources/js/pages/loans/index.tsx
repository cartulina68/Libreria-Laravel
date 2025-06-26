import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoanProgressBar from "@/components/loanProgressBar";

// import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Calendar,
  DollarSign,
  // Clock,
  // RotateCcw,
  //Plus,
} from 'lucide-react';
import { Loan, PaginatedResponse } from '@/types';

interface Props {
  loans: PaginatedResponse<Loan>;
}

export default function LoanDashboard({ loans }: Props) {
  console.log(loans)

  const activeLoans = loans.data.filter((l) => l.status === 'active');
  const pastLoans = loans.data.filter((l) => l.status !== 'active');

  const totalSpent = loans.data.reduce((sum, loan) => sum + loan.total_price, 0);
  // const totalRemainingDays = activeLoans.reduce(
  //   (sum, loan) => sum + loan.remaining_days,
  //   0
  // );

  // const getStatusColor = (status: string, remaining: number) => {
  //   if (status !== 'active') return 'secondary';
  //   if (remaining <= 0) return 'destructive';
  //   if (remaining <= 2) return 'default';
  //   return 'secondary';
  // };

  // const getStatusText = (status: string, remaining: number) => {
  //   if (status !== 'active') return 'Completado';
  //   if (remaining <= 0) return 'Atrasado';
  //   if (remaining === 1) return '1 día restante';
  //   return `${remaining} días restantes`;
  // };

  return (
    <AppLayout>
      <Head title="Mis Préstamos" />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Mis Préstamos</h1>
          <p className="text-muted-foreground">Consulta tus préstamos activos e históricos.</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{activeLoans.length}</p>
                <p className="text-sm text-muted-foreground">Activos</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{pastLoans.length}</p>
                <p className="text-sm text-muted-foreground">Completados</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">S/ {totalSpent.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Pagado</p>
              </div>
            </CardContent>
          </Card>

          {/* <Card>
            <CardContent className="p-6 flex items-center space-x-2">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{totalRemainingDays}</p>
                <p className="text-sm text-muted-foreground">Días restantes</p>
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Pestañas */}
        <Tabs defaultValue="activos" className="space-y-6">
          <TabsList>
            <TabsTrigger value="activos">Activos ({activeLoans.length})</TabsTrigger>
            <TabsTrigger value="historial">Historial ({pastLoans.length})</TabsTrigger>
          </TabsList>

          {/* Activos */}
          <TabsContent value="activos" className="space-y-4">
            {activeLoans.length === 0 ? (
              <p className="text-muted-foreground">No tienes préstamos activos.</p>
            ) : (
              activeLoans.map((loan) => (
                <Card key={loan.id}>
                  <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                    {/* <img
                      src={loan.book.cover_url ?? '/placeholder-book.jpg'}
                      alt={loan.book.title}
                      className="w-24 h-36 object-cover rounded"
                    /> */}
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold">{loan.book.title}</h3>
                      <p className="text-muted-foreground">{loan.book.author.name}</p>
                      <div className="text-sm text-muted-foreground">
                        <p>Inicio: {loan.start_date}</p>
                        <p>Fin: {loan.end_date}</p>
                        <p>Precio: S/ {loan.total_price}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progreso</span>
                        {/* <Badge variant={getStatusColor(loan.status, loan.remaining_days)}>
                          {getStatusText(loan.status, loan.remaining_days)}
                        </Badge> */}
                      </div>
                      {<LoanProgressBar
                      startDate={loan.start_date}
                      endDate={loan.end_date}
                       />
                      }
                    </div>
                    {/* <div className="flex flex-col gap-2 md:w-32">
                      <Button variant="outline" size="sm">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Extender
                      </Button>
                    </div> */}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Historial */}
          <TabsContent value="historial" className="space-y-4">
            {pastLoans.length === 0 ? (
              <p className="text-muted-foreground">No hay historial aún.</p>
            ) : (
              pastLoans.map((loan) => (
                <Card key={loan.id}>
                  <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                    {/* <img
                      src={loan.book.cover_url ?? '/placeholder-book.jpg'}
                      alt={loan.book.title}
                      className="w-24 h-36 object-cover rounded"
                    /> */}
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold">{loan.book.title}</h3>
                      <p className="text-muted-foreground">{loan.book.author.name}</p>
                      <div className="text-sm text-muted-foreground">
                        <p>Inicio: {loan.start_date}</p>
                        <p>Fin: {loan.end_date}</p>
                        <p>Total: S/ {loan.total_price}</p>
                      </div>
                      <Badge variant="secondary">Completado</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
