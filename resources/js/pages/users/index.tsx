import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { PaginatedResponse, User } from '@/types';

interface Props {
  users: PaginatedResponse<User>;
}

export default function UserIndex({ users }: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleActive = () => {
    if (selectedUser) {
      setIsLoading(true);

      router.patch(`/usuarios/${selectedUser.id}/toggle-estado`, {}, {
        onSuccess: () => {
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
            setSelectedUser(null);
            setIsDialogOpen(false);
          }, 2000);
        },
        onFinish: () => {
          setIsLoading(false);
        },
      });
    }
  };

  const isAdmin = (user: User) => {
    return user.roles?.some((r) => r.slug === 'admin');
  };

  return (
    <AppLayout>
      <Head title="Usuarios" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Lista de Usuarios</h1>

        {showMessage && (
          <div className="p-4 bg-green-100 text-green-700 rounded">
            Estado del usuario actualizado correctamente.
          </div>
        )}

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.roles?.map((r) => r.name).join(', ') ?? '—'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {isAdmin(user) ? (
                        <span className="text-sm text-muted-foreground italic">Admin</span>
                      ) : (
                        <Dialog open={isDialogOpen} onOpenChange={(open) => {
                          if (!open) setSelectedUser(null);
                          setIsDialogOpen(open);
                        }}>
                          <DialogTrigger asChild>
                            <Button
                              variant={user.active ? 'destructive' : 'default'}
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsDialogOpen(true);
                              }}
                            >
                              {user.active ? 'Desactivar' : 'Activar'}
                            </Button>
                          </DialogTrigger>
                          {selectedUser && (
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  ¿{selectedUser.active ? 'Desactivar' : 'Activar'} usuario?
                                </DialogTitle>
                              </DialogHeader>
                              <p className="text-sm text-muted-foreground mb-4">
                                ¿Estás seguro de que deseas {selectedUser.active ? 'desactivar' : 'activar'} la cuenta de "{selectedUser.name}"?
                              </p>
                              <DialogFooter className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
                                  Cancelar
                                </Button>
                                <Button
                                  variant={selectedUser.active ? 'destructive' : 'default'}
                                  onClick={handleToggleActive}
                                  disabled={isLoading}
                                >
                                  {isLoading ? (
                                    <span className="flex items-center gap-2">
                                      <svg
                                        className="animate-spin h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <circle
                                          className="opacity-25"
                                          cx="12"
                                          cy="12"
                                          r="10"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                        />
                                        <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                                        />
                                      </svg>
                                      Procesando...
                                    </span>
                                  ) : (
                                    selectedUser.active ? 'Desactivar' : 'Activar'
                                  )}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          )}
                        </Dialog>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
