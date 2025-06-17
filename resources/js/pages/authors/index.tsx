import { Head, Link } from '@inertiajs/react'
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from "@/components/ui/table"
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import AppPagination from '@/components/ui/app-pagination';

interface PaginationLink {
    url: string;
    label: string;
    active: boolean;
}

interface Author {
    id: number;
    name: string;
    nationality: string;
}

interface AuthorIndexProps {
    authors: {
        data: Author[];
        links: PaginationLink[];
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Autores',
        href: '/autores',
    },
];

export default function Index({ authors }: AuthorIndexProps) {
    console.log(authors);

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {authors.data.map(author => (
                            <TableRow key={author.id}>
                                <TableCell>{author.id}</TableCell>
                                <TableCell>{author.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Paginación */}
                <AppPagination paginated={authors.links} />
            </AppLayout>
        </div>
    )
}
