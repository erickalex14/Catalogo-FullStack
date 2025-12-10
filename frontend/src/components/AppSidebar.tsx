import { Home, Users, Package, Tag, Percent, Box } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

const menuItems = [
  { title: 'Dashboard', icon: Home, path: 'dashboard' },
  { title: 'Usuarios', icon: Users, path: 'users' },
  { title: 'Productos', icon: Package, path: 'products' },
  { title: 'Tipos de Producto', icon: Tag, path: 'product-types' },
  { title: 'Descuentos', icon: Percent, path: 'discounts' },
  { title: 'Combos', icon: Box, path: 'combos' },
];

interface AppSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function AppSidebar({ currentPage, onNavigate }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={currentPage === item.path}
                    onClick={() => onNavigate(item.path)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
