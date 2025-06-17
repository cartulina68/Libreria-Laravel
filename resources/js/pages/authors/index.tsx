import AppPagination from '@/components/ui/app-pagination';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedResponse } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2, UserRoundPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Author {
  id: number;
  name: string;
  nationality: string;
}

interface AuthorIndexProps {
  authors: PaginatedResponse<Author>;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Autores',
    href: '/autores',
  },
];

export default function Index({ authors }: AuthorIndexProps) {
  const handleDelete = (authorId: number) => {
    router.delete(route('authors.destroy', authorId));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Autores" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div>
          <Button variant="outline" size="sm" asChild>
            <Link href={route('authors.create')}>
              <UserRoundPlus className="mr-2 h-4 w-4" /> Agregar autor
            </Link>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Nacionalidad</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.data.map((author) => (
              <TableRow key={author.id}>
                <TableCell>{author.id}</TableCell>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.nationality}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={route('authors.edit', author.id)}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>¿Estás seguro?</DialogTitle>
                          <DialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente al autor {author.name}.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => handleDelete(author.id)} className="bg-red-500 text-white hover:bg-red-600">
                            Eliminar
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <AppPagination paginated={authors} />
      </div>
    </AppLayout>
  );
}
