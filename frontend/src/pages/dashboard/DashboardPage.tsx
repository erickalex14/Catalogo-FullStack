import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, Tag, TrendingUp, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import type { User, Product, ProductType, Combo } from '../../types/index';
import { usersService, productsService, productTypesService, combosService } from '../../lib/services';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

// Página del Dashboard
export function DashboardPage() {
    // Estados para datos y carga
  const [users, setUsers] = useState<User[]>([]);
    // Estados para productos
  const [products, setProducts] = useState<Product[]>([]);
  // Estados para tipos de producto
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  // Estados para combos
  const [combos, setCombos] = useState<Combo[]>([]);
  // Estado de carga y error
  const [loading, setLoading] = useState(true);
  // Estado de error
  const [error, setError] = useState<string | null>(null);


// Cargar datos al montar el componente
  useEffect(() => {
    void loadData();
  }, []);


// Función para cargar datos desde el backend
  const loadData = async () => {
    
    try {
      setLoading(true);
      setError(null);
      // Cargar todos los datos en paralelo
      const [usersData, productsData, productTypesData, combosData] = await Promise.all([
        usersService.getAll(),
        productsService.getAll(),
        productTypesService.getAll(),
        combosService.getAll(),
      ]);
      // Actualizar estados con los datos cargados
      setUsers(usersData);
      setProducts(productsData);
      setProductTypes(productTypesData);
      setCombos(combosData);
      // Manejo de errores
    } catch (err) {
      setError('Error al cargar los datos. Asegúrate de que el backend esté ejecutándose.');
      console.error(err);
      // Finalmente, desactivar estado de carga
    } finally {
      setLoading(false);
    }
  };

  // Estadísticas para mostrar en el dashboard
  const stats = useMemo(
    () => [
      {
        title: 'Usuarios',
        value: users.length,
        icon: Users,
        color: 'text-blue-600',
        bgColor: 'bg-blue-500/10',
      },
      {
        title: 'Productos',
        value: products.length,
        icon: Package,
        color: 'text-green-600',
        bgColor: 'bg-green-500/10',
      },
      {
        title: 'Categorías',
        value: productTypes.length,
        icon: Tag,
        color: 'text-purple-600',
        bgColor: 'bg-purple-500/10',
      },
      {
        title: 'Combos',
        value: combos.length,
        icon: TrendingUp,
        color: 'text-orange-600',
        bgColor: 'bg-orange-500/10',
      },
    ],
    [users.length, products.length, productTypes.length, combos.length]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={loadData}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2>Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Resumen general de tu sistema de administración
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={stat.color}>{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Productos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  {product.imageBase64 ? (
                    <img
                      src={product.imageBase64}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Package className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{product.name}</p>
                    <p className="text-muted-foreground">
                      ${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                    </p>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No hay productos disponibles
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Usuarios Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{user.name || 'Sin nombre'}</p>
                    <p className="text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              ))}
              {users.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No hay usuarios disponibles
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
