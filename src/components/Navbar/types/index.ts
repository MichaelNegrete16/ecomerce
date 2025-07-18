export interface MenuItem {
  name: string;
  href: string;
}

export interface NavbarProps {
  menuItems?: MenuItem[];
  cartCount?: number;
  onSearchClick?: () => void;
  onCartClick?: () => void;
}
