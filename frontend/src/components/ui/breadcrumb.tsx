"use client";

//Importaciones
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "./utils";


//BREADCRUMB ES UN COMPONENTE DE NAVEGACION QUE MUESTRA LA UBICACION ACTUAL DENTRO DE UNA ESTRUCTURA HIERARQUICA DE SITIOS WEB O APLICACIONES

//Funcion Breadcrumb que sirve como contenedor principal
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
    //Retorna un elemento de navegacion con el rol de breadcrumb
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

//Funcion BreadcrumbList que sirve como contenedor de los items del breadcrumb
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
    //Retorna una lista ordenada con estilos personalizados
  return (
    <ol
    
      data-slot="breadcrumb-list"
      //Clase personalizada para estilos
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

//Funcion BreadcrumbItem que representa cada elemento individual del breadcrumb
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
    //Elemento de lista con estilos personalizados
      data-slot="breadcrumb-item"
      //Clase personalizada para estilos
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

//Funcion BreadcrumbLink que representa un enlace dentro del breadcrumb
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";
  //Retorna un enlace con estilos personalizados
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
}

//Funcion BreadcrumbPage que representa la pagina actual en el breadcrumb
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

//Funcion BreadcrumbSeparator que representa el separador entre los items del breadcrumb
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

//Funcion BreadcrumbEllipsis que representa los items ocultos en el breadcrumb

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

//Exportaciones de los componentes
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
