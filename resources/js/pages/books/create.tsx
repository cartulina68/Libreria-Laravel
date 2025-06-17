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

interface CreateBookProps {
  authors: Author[];
  categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Libros',
    href: '/libros',
  },
  {
    title: 'Crear libro',
    href: '/libros/crear',
  },
];

type BookForm = {
  title: string;
  publication_year: string;
  price_per_day: string;
  author_id: string;
  category_id: string;
};

export default function Create({ authors, categories }: CreateBookProps) {
  const { data, setData, post, processing, errors } = useForm<BookForm>({
    title: '',
    publication_year: '',
    price_per_day: '',
    author_id: '',
    category_id: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('books.store'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Crear Libro" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <HeadingSmall
            title="Crear nuevo libro"
            description="Ingresa los datos del libro para registrarlo en el sistema"
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
                placeholder="Ej. 2020"
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
                placeholder="Ej. 1.50"
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
              <Button type="submit" disabled={processing}>Guardar libro</Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
