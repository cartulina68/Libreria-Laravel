import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import type { PaginatedResponse } from '@/types'

type Props = {
	paginated: PaginatedResponse<unknown>;
}

export default function AppPagination({ paginated }: Props) {
	const { links, prev_page_url, next_page_url } = paginated;

	return (
		<Pagination className="mt-4">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						aria-disabled={!!prev_page_url}
						href={prev_page_url ?? undefined}
						isActive={!prev_page_url}
					/>
				</PaginationItem>

				{links.map((link, i) => {
					if (i > 0 && i < links.length - 1) {
						return (
							<PaginationItem key={link.label}>
								<PaginationLink
									href={link.url!}
									isActive={link.active}
									dangerouslySetInnerHTML={{ __html: link.label }}
								/>
							</PaginationItem>
						)
					}
				})}

				<PaginationItem>
					<PaginationNext
						aria-disabled={!!next_page_url}
						href={next_page_url ?? undefined}
						isActive={!next_page_url}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
