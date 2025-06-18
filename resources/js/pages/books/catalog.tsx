import { useEffect } from 'react';
import { useForm, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import AppPagination from '@/components/ui/app-pagination';
import { Author, Book, Category, PaginatedResponse } from '@/types';

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
            <option value="">Todos los autores</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Select>
          <Select
            value={data.category}
            onValueChange={(value) => setData('category', value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.data.map((book) => (
            <Card key={book.id}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author.name}</p>
                <p className="text-sm text-gray-600">{book.category.name}</p>
                <p className="mt-2">S/ {book.price_per_day.toFixed(2)} por día</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <AppPagination paginated={books} />
      </div>
    </AppLayout>
  );
}
