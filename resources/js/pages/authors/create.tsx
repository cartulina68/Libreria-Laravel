import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import HeadingSmall from '@/components/heading-small';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Autores',
    href: '/autores',
  },
  {
    title: 'Crear autor',
    href: '/autores/crear',
  },
];

type AuthorForm = {
  name: string;
  nationality: string;
};

export default function Create() {
  const { data, setData, post, processing, errors } = useForm<AuthorForm>({
    name: '',
    nationality: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('authors.store'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Crear Autor" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <HeadingSmall
            title="Crear nuevo autor"
            description="Ingresa los datos del autor para registrarlo en el sistema"
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
                placeholder="Nombre del autor"
              />
              <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nationality">Nacionalidad</Label>
              <Input
                id="nationality"
                value={data.nationality}
                onChange={(e) => setData('nationality', e.target.value)}
                type="text"
                className="mt-1 block w-full"
                placeholder="Nacionalidad del autor"
              />
              <InputError message={errors.nationality} />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={processing}>Guardar autor</Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
