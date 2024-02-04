export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Syshorta",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Clientes",
      href: "/customers",
    },
    {
      title: "Produtos",
      href: "/products",
    },
    {
      title: "Pedidos de Venda",
      href: "/sellOrders",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
