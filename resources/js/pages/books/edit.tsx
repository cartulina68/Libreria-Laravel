import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import HeadingSmall from '@/components/heading-small';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Author {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  publication_year: number;
  price_per_day: number;
  author_id: number;
  category_id: number;
}

interface EditProps {
  book: Book;
  authors: Author[];
  categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Libros',
    href: '/libros',
  },
  {
    title: 'Editar libro',
    href: '/libros/editar',
  },
];

export default function Edit({ book, authors, categories }: EditProps) {
  const { data, setData, patch, processing, errors } = useForm({
    title: book.title,
    publication_year: book.publication_year.toString(),
    price_per_day: book.price_per_day.toString(),
    author_id: book.author_id.toString(),
    category_id: book.category_id.toString(),
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('books.update', book.id));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Editar Libro" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <HeadingSmall
            title="Editar libro"
            description="Modifica los datos del libro"
          />

          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                type="text"
                placeholder="Título del libro"
              />
              <InputError message={errors.title} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="publication_year">Año de publicación</Label>
              <Input
                id="publication_year"
                value={data.publication_year}
                onChange={(e) => setData('publication_year', e.target.value)}
                type="number"
              />
              <InputError message={errors.publication_year} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price_per_day">Precio por día (S/)</Label>
              <Input
                id="price_per_day"
                value={data.price_per_day}
                onChange={(e) => setData('price_per_day', e.target.value)}
                type="number"
                step="0.01"
              />
              <InputError message={errors.price_per_day} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="author_id">Autor</Label>
              <Select
                value={data.author_id}
                onValueChange={(value) => setData('author_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un autor" />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={String(author.id)}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.author_id} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category_id">Categoría</Label>
              <Select
                value={data.category_id}
                onValueChange={(value) => setData('category_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.category_id} />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={processing}>
                Guardar cambios
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
