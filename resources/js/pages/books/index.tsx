import AppPagination from '@/components/ui/app-pagination';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedResponse } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2, FolderPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Book {
  id: number;
  title: string;
  publication_year: number;
  price_per_day: number;
  author: {
    name: string;
  };
  category: {
    name: string;
  };
}

interface BookIndexProps {
  books: PaginatedResponse<Book>;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Libros',
    href: '/libros',
  },
];

export default function Index({ books }: BookIndexProps) {
  const handleDelete = (bookId: number) => {
    router.delete(route('books.destroy', bookId));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Libros" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div>
          <Button variant="outline" size="sm" asChild>
            <Link href={route('books.create')}>
              <FolderPlus className="mr-2 h-4 w-4" /> Agregar libro
            </Link>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Año</TableHead>
              <TableHead>Precio por día</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.data.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.publication_year}</TableCell>
                <TableCell>S/ {book.price_per_day.toFixed(2)}</TableCell>
                <TableCell>{book.author?.name}</TableCell>
                <TableCell>{book.category?.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={route('books.edit', book.id)}>
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
                            Esta acción eliminará permanentemente el libro {book.title}.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => handleDelete(book.id)}
                            className="bg-red-500 text-white hover:bg-red-600"
                          >
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

        <AppPagination paginated={books} />
      </div>
    </AppLayout>
  );
}
