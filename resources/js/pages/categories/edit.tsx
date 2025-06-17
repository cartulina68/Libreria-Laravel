import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import HeadingSmall from '@/components/heading-small';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface EditProps {
  category: Category;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categorías',
    href: '/categorias',
  },
  {
    title: 'Editar categoría',
    href: '/categorias/editar',
  },
];

export default function Edit({ category }: EditProps) {
  const { data, setData, patch, processing, errors } = useForm({
    name: category.name,
    description: category.description,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('categories.update', category.id));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Editar Categoría" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <HeadingSmall
            title="Editar categoría"
            description="Modifica los datos de la categoría"
          />

          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                type="text"
                className="mt-1 block w-full"
                placeholder="Nombre de la categoría"
              />
              <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                type="text"
                className="mt-1 block w-full"
                placeholder="Descripción de la categoría"
              />
              <InputError message={errors.description} />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={processing}>Guardar cambios</Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
