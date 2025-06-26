/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Bookmark, BookText, LayoutGrid, SquareUserRound, Users } from 'lucide-react';
import AppLogo from './app-logo';

import { usePage } from '@inertiajs/react';

const adminNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid,
  },

  {
    title: 'Usuarios', // ✅ Nuevo botón
    href: '/usuarios',
    icon: Users,
  },

  {
    title: 'Autores',
    href: '/autores',
    icon: SquareUserRound,
  },
  {
    title: 'Categorias',
    href: '/categorias',
    icon: Bookmark,
  },
  {
    title: 'Libros',
    href: '/libros',
    icon: BookText,
  },
];

const clientNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Catálogo',
    href: '/catalogo',
    icon: BookText,
  },
  {
    title: 'Préstamos',
    href: '/prestamos',
    icon: BookText,
  },
];

export function AppSidebar() {
  const { auth } = usePage().props as any;

  const isAdmin = auth.user.roles.some((role: any) => role.slug === 'admin');
  const navItems = isAdmin ? adminNavItems : clientNavItems;

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
