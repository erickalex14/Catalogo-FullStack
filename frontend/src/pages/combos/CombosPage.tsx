import { useState, useEffect } from 'react';
import { DataTable, type Column } from '../../components/DataTable';
import { DeleteDialog } from '../../components/DeleteDialog';
import type { Combo, Product, Discount } from '../../types/index';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Package, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { combosService, productsService, discountsService } from '../../lib/services';


// Página de Gestión de Combos
export function CombosPage() {
  // Estados para datos de la API
  const [combos, setCombos] = useState<Combo[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    // Estados para diálogos y formularios
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<Combo | null>(null);
  // Estado del formulario de creación/edición de combo
  const [formData, setFormData] = useState({
    nombre: '',
    productId: 0,
    discountId: null as number | null,
  });

  // Cargar datos al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  // Función para cargar todos los datos necesarios
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [combosData, productsData, discountsData] = await Promise.all([
        combosService.getAll(),
        productsService.getAll(),
        discountsService.getAll(),
      ]);
      setCombos(combosData);
      setProducts(productsData);
      setDiscounts(discountsData);
    } catch (err) {
      setError('Error al cargar los datos. Verifica que el servidor esté corriendo.');
      toast.error('Error al cargar los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Definición de columnas para la tabla de combos
  const columns: Column<Combo>[] = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre del Combo' },
    {
      key: 'productId',
      label: 'Producto',
      render: (combo) => {
        const product = products.find((p) => p.id === combo.productId);
        return product ? (
          <div className="flex items-center gap-2">
            {product.imageBase64 && (
              <img
                src={product.imageBase64}
                alt={product.name}
                className="w-8 h-8 rounded object-cover"
              />
            )}
            <span>{product.name}</span>
          </div>
        ) : (
          'N/A'
        );
      },
    },
    {
      key: 'discountId',
      label: 'Descuento',
      render: (combo) => {
        if (!combo.discountId) return 'Sin descuento';
        const discount = discounts.find((d) => d.id === combo.discountId);
        return discount ? (
          <Badge variant="secondary" className="bg-green-500/10 text-green-700">
            {discount.porcentaje}%
          </Badge>
        ) : (
          'N/A'
        );
      },
    },
  ];

  // Manejadores de eventos para crear, editar y eliminar combos
  // Abrir diálogo de creación
  const handleCreate = () => {
    // Reiniciar formulario
    setFormData({
      nombre: '',
      productId: products[0]?.id || 0,
      discountId: null,
    });
    setIsCreateDialogOpen(true);
  };

  // Abrir diálogo de edición
  const handleEdit = (combo: Combo) => {
    setSelectedCombo(combo);
    setFormData({
      nombre: combo.nombre,
      productId: combo.productId,
      discountId: combo.discountId ?? null,
    });
    setIsEditDialogOpen(true);
  };

    // Abrir diálogo de eliminación
  const handleDelete = (combo: Combo) => {
    setSelectedCombo(combo);
    setIsDeleteDialogOpen(true);
  };

  // Manejadores de envío de formularios y confirmación
  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.productId) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }
    try {
      const nuevoCombo = await combosService.create({
        nombre: formData.nombre,
        productId: formData.productId,
        discountId: formData.discountId ?? undefined,
      });
      setCombos([...combos, nuevoCombo]);
      setIsCreateDialogOpen(false);
      toast.success('Combo creado exitosamente');
    } catch (err) {
      toast.error('Error al crear el combo');
      console.error(err);
    }
  };

  // Envío del formulario de edición
  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCombo) return;
    if (!formData.nombre || !formData.productId) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }
    try {
      const comboActualizado = await combosService.update(selectedCombo.id, {
        nombre: formData.nombre,
        productId: formData.productId,
        discountId: formData.discountId ?? undefined,
      });
      setCombos(combos.map((c) => (c.id === selectedCombo.id ? comboActualizado : c)));
      setIsEditDialogOpen(false);
      toast.success('Combo actualizado exitosamente');
    } catch (err) {
      toast.error('Error al actualizar el combo');
      console.error(err);
    }
  };

    // Confirmación de eliminación
  const handleConfirmDelete = async () => {
    if (!selectedCombo) return;
    try {
      await combosService.delete(selectedCombo.id);
      setCombos(combos.filter((c) => c.id !== selectedCombo.id));
      setIsDeleteDialogOpen(false);
      toast.success('Combo eliminado exitosamente');
    } catch (err) {
      toast.error('Error al eliminar el combo');
      console.error(err);
    }
  };

  // Mostrar loading mientras se cargan los datos
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Mostrar error si falló la carga
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-destructive">{error}</p>
        <Button onClick={loadData}>Reintentar</Button>
      </div>
    );
  }

  // Renderizado de la página
  return (
    <div className="space-y-6">
      <div>
        <h2>Combos</h2>
        <p className="text-muted-foreground mt-2">
          Gestiona los combos de productos con descuentos especiales
        </p>
      </div>

      <DataTable
        data={combos}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        createLabel="Crear Combo"
        searchPlaceholder="Buscar combos..."
        emptyMessage="No hay combos registrados"
      />

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crear Combo</DialogTitle>
            <DialogDescription>
              Crea un combo seleccionando productos y descuentos
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitCreate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Combo</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej: Pack Oficina Premium"
              />
            </div>

            <div className="space-y-3">
              <Label>Seleccionar Producto</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className={`cursor-pointer transition-all ${
                      formData.productId === product.id
                        ? 'ring-2 ring-primary shadow-md'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setFormData({ ...formData, productId: product.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {product.imageBase64 ? (
                          <img
                            src={product.imageBase64}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                            <Package className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="truncate mb-1">{product.name}</p>
                          <p className="text-muted-foreground mb-1">
                            ${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                          </p>
                          {formData.productId === product.id && (
                            <Badge variant="default">Seleccionado</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountId">Descuento del Combo (Opcional)</Label>
              <Select
                value={formData.discountId?.toString() || 'none'}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    discountId: value === 'none' ? null : Number(value),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sin descuento adicional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin descuento adicional</SelectItem>
                  {discounts.map((discount) => (
                    <SelectItem key={discount.id} value={discount.id.toString()}>
                      {discount.porcentaje}% de descuento
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Crear Combo</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Combo</DialogTitle>
            <DialogDescription>
              Actualiza la información del combo
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="edit-nombre">Nombre del Combo</Label>
              <Input
                id="edit-nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej: Pack Oficina Premium"
              />
            </div>

            <div className="space-y-3">
              <Label>Seleccionar Producto</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className={`cursor-pointer transition-all ${
                      formData.productId === product.id
                        ? 'ring-2 ring-primary shadow-md'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setFormData({ ...formData, productId: product.id })}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {product.imageBase64 ? (
                          <img
                            src={product.imageBase64}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                            <Package className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="truncate mb-1">{product.name}</p>
                          <p className="text-muted-foreground mb-1">
                            ${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                          </p>
                          {formData.productId === product.id && (
                            <Badge variant="default">Seleccionado</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-discountId">Descuento del Combo (Opcional)</Label>
              <Select
                value={formData.discountId?.toString() || 'none'}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    discountId: value === 'none' ? null : Number(value),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sin descuento adicional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin descuento adicional</SelectItem>
                  {discounts.map((discount) => (
                    <SelectItem key={discount.id} value={discount.id.toString()}>
                      {discount.porcentaje}% de descuento
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar Cambios</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar combo?"
        description={`Estás a punto de eliminar el combo "${selectedCombo?.nombre}". Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
