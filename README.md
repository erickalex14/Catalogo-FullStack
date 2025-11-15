# Catalogo Backend (Nest.js + Prisma)

Backend para aplicación de catálogo de productos con soporte de tipos, descuentos y combos.

## Arquitectura por capas
```
src/
  prisma/              -> Integración Prisma
  users/               -> Usuarios (controllers, services, repositories, entities, dto, interfaces)
  product-types/       -> Tipos de producto
  discounts/           -> Descuentos
  products/            -> Productos
  combos/              -> Combos
```
Cada dominio expone:
- Controller: capa HTTP (REST) sin lógica de negocio
- Service: reglas / orquestación
- Repository: acceso a datos (actualmente InMemory, luego Prisma)
- Entities / DTO / Interfaces: contratos y tipos

## Estado actual
- Estructura creada sin migraciones ejecutadas.
- `schema.prisma` contiene los modelos: User, ProductType, Discount, Product, Combo.
- Repositorios en memoria para facilitar pruebas sin base de datos.

## Próximos pasos sugeridos
1. Instalar dependencias e inicializar Prisma.
2. Ajustar tipos (precio Decimal, validaciones con `class-validator`), 
3. Implementar repositorios Prisma (reemplazar InMemory).
4. Añadir autenticación (JWT) para usuarios.
5. Añadir casos de uso (crear producto, aplicar descuento, listar combos, etc.).
6. Migraciones y seeds de datos.

## Instalación
```powershell
npm install
npx prisma generate
```
(No ejecutes `prisma migrate dev` hasta que confirmes el modelo final.)

## Variables de entorno
Ver `.env.example` y copiar a `.env` ajustando `DATABASE_URL`.

## Comandos útiles
```powershell
npm run start:dev      # Desarrollo
npm run prisma:studio  # Visualizar datos (tras migraciones)
```

## NOTA SOBRE COMBOS
El diagrama sugiere un combo asociado a un solo producto. Si luego necesitas combos con múltiples productos, se agregará una tabla intermedia (p.e. `ComboItem`).

## Licencia
Uso interno.
