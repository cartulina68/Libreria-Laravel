import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination'
import type { PaginatedResponse } from '@/types'

type Props = {
  paginated: PaginatedResponse<any>;
}

export default function AppPagination({ paginated }: Props) {
  const { current_page, last_page, links } = paginated

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={links[0].url}
            aria-disabled={!links[0].url}
          />
        </PaginationItem>

        {links.map((link, i) => (
          <PaginationItem key={i}>
            {link.label === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={link.url!}
                isActive={link.active}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={links[links.length - 1].url}
            aria-disabled={!links[links.length - 1].url}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
