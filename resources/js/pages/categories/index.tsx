import AppPagination from '@/components/ui/app-pagination';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category, PaginatedResponse } from '@/types';
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

interface CategoryIndexProps {
  categories: PaginatedResponse<Category>;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categorías',
    href: '/categorias',
  },
];

export default function Index({ categories }: CategoryIndexProps) {
  const handleDelete = (categoryId: number) => {
    router.delete(route('categories.destroy', categoryId));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Categorías" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div>
          <Button variant="outline" size="sm" asChild>
            <Link href={route('categories.create')}>
              <FolderPlus className="mr-2 h-4 w-4" /> Agregar categoría
            </Link>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.data.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={route('categories.edit', category.id)}>
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
                            Esta acción eliminará permanentemente la categoría {category.name}.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => handleDelete(category.id)}
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

        <AppPagination paginated={categories} />
      </div>
    </AppLayout>
  );
}
