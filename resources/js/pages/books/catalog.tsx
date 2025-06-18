import { useEffect } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import AppPagination from '@/components/ui/app-pagination';
import { Author, Book, Category, PaginatedResponse } from '@/types';
import { Button } from '@/components/ui/button';
import { BookUser } from 'lucide-react';

interface CatalogProps {
  books: PaginatedResponse<Book>;
  filters: {
    search?: string;
    author?: string;
    category?: string;
  };
  authors: Array<Author>;
  categories: Array<Category>;
}

export default function Catalog({ books, filters, authors, categories }: CatalogProps) {
  const { data, setData, get } = useForm({
    search: filters.search || '',
    author: filters.author || '',
    category: filters.category || '',
  });

  useEffect(() => {
    get('/catalogo', {
      preserveState: true,
      preserveScroll: true,
    });
  }, [data, get]);

  return (
    <AppLayout>
      <Head title="Catálogo de Libros" />
      <div className="p-6 space-y-6">
        <div className="flex gap-4">
          <Input
            placeholder="Buscar por título..."
            value={data.search}
            onChange={(e) => setData('search', e.target.value)}
            className="max-w-sm"
          />
          <Select
            value={data.author}
            onValueChange={(value) => setData('author', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos los autores" />
            </SelectTrigger>
            <SelectContent>
              {authors.map((author) => (
                <SelectItem key={author.id} value={String(author.id)}>
                  {author.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={data.category}
            onValueChange={(value) => setData('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.data.map((book) => (
            <Card key={book.id}>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author.name}</p>
                  <p className="text-sm text-gray-600">{book.category.name}</p>
                  <p className="mt-2">S/ {book.price_per_day.toFixed(2)} por día</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={route('loans.create', book.id)}>
                    <BookUser className="mr-2 h-4 w-4" /> Solicitar Préstamo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <AppPagination paginated={books} />
      </div>
    </AppLayout>
  );
}
