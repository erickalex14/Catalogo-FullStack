import { useEffect, useMemo, useState } from 'react';
import { DataTable, type Column } from '../../components/DataTable';
import { DeleteDialog } from '../../components/DeleteDialog';
import { ImageDropzone } from '../../components/ImageDropzone';
import type { Product, ProductType, Discount } from '../../types/index';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { productsService, productTypesService, discountsService } from '../../lib/services';

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  productTypeId: number;
  discountId: number | null;
  imageBase64: string;
};

const INITIAL_FORM_STATE: ProductFormState = {
  name: '',
  description: '',
  price: '',
  productTypeId: 0,
  discountId: null,
  imageBase64: '',
};

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormState>(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsData, productTypesData, discountsData] = await Promise.all([
        productsService.getAll(),
        productTypesService.getAll(),
        discountsService.getAll(),
      ]);
      setProducts(productsData);
      setProductTypes(productTypesData);
      setDiscounts(discountsData);
    } catch (err) {
      setError('Error al cargar los productos. Verifica que el backend esté activo.');
      toast.error('No se pudieron cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<Product>[] = useMemo(
    () => [
      { key: 'id', label: 'ID' },
      {
        key: 'imageBase64',
        label: 'Imagen',
        render: (product) =>
          product.imageBase64 ? (
            <img
              src={product.imageBase64}
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-muted" />
          ),
      },
      { key: 'name', label: 'Nombre' },
      {
        key: 'price',
        label: 'Precio',
        render: (product) => {
          const priceValue = product.price ? Number(product.price) : 0;
          return (
            <Badge variant="secondary">
              ${priceValue > 0 ? priceValue.toFixed(2) : '0.00'}
            </Badge>
          );
        },
      },
      {
        key: 'productTypeId',
        label: 'Tipo',
        render: (product) => {
          const type = productTypes.find((item) => item.id === product.productTypeId);
          return type?.name ?? 'N/A';
        },
      },
      {
        key: 'discountId',
        label: 'Descuento',
        render: (product) => {
          if (!product.discountId) return 'Sin descuento';
          const discount = discounts.find((item) => item.id === product.discountId);
          return discount ? (
            <Badge variant="secondary" className="bg-green-500/10 text-green-700">
              {discount.porcentaje}%
            </Badge>
          ) : (
            'N/A'
          );
        },
      },
    ],
    [productTypes, discounts]
  );

  const resetForm = () => {
    setFormData((prev) => ({
      ...INITIAL_FORM_STATE,
      productTypeId: productTypes[0]?.id ?? 0,
    }));
  };

  const handleCreate = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description ?? '',
      price: product.price ?? '',
      productTypeId: product.productTypeId,
      discountId: product.discountId ?? null,
      imageBase64: product.imageBase64 ?? '',
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const buildCreatePayload = () => {
    const trimmedName = formData.name.trim();
    const trimmedDescription = formData.description.trim();
    const priceValue = Number(formData.price);

    if (!trimmedName || !trimmedDescription || Number.isNaN(priceValue) || priceValue <= 0) {
      return null;
    }

    return {
      name: trimmedName,
      description: trimmedDescription,
      price: formData.price,
      productTypeId: formData.productTypeId,
      discountId: formData.discountId ?? undefined,
      imageBase64: formData.imageBase64,
    };
  };

  const handleSubmitCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = buildCreatePayload();
    if (!payload) {
      toast.error('Por favor completa todos los campos correctamente');
      return;
    }

    try {
      const newProduct = await productsService.create(payload);
      setProducts([...products, newProduct]);
      setIsCreateDialogOpen(false);
      toast.success('Producto creado exitosamente');
    } catch (err) {
      toast.error('Error al crear el producto');
      console.error(err);
    }
  };

  const handleSubmitEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedProduct) return;

    const payload = buildCreatePayload();
    if (!payload) {
      toast.error('Por favor completa todos los campos correctamente');
      return;
    }

    const updatePayload: Record<string, unknown> = {
      ...payload,
    };

    if (!formData.imageBase64) {
      delete updatePayload.imageBase64;
    }

    try {
      const updatedProduct = await productsService.update(selectedProduct.id, updatePayload);
      setProducts(
        products.map((product) => (product.id === selectedProduct.id ? updatedProduct : product))
      );
      setIsEditDialogOpen(false);
      toast.success('Producto actualizado exitosamente');
    } catch (err) {
      toast.error('Error al actualizar el producto');
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    try {
      await productsService.delete(selectedProduct.id);
      setProducts(products.filter((product) => product.id !== selectedProduct.id));
      setIsDeleteDialogOpen(false);
      toast.success('Producto eliminado exitosamente');
    } catch (err) {
      toast.error('Error al eliminar el producto');
      console.error(err);
    }
  };

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
        <Button onClick={() => void loadData()}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2>Productos</h2>
        <p className="text-muted-foreground mt-2">
          Gestiona el catálogo de productos
        </p>
      </div>

      <DataTable
        data={products}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        createLabel="Crear Producto"
        searchPlaceholder="Buscar productos..."
        emptyMessage="No hay productos registrados"
      />

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crear Producto</DialogTitle>
            <DialogDescription>
              Agrega un nuevo producto al catálogo
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nombre del producto"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe el producto..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(event) =>
                      setFormData({ ...formData, price: event.target.value })
                    }
                    placeholder="0.00"
                  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productTypeId">Tipo de Producto</Label>
                <Select
                  value={formData.productTypeId.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, productTypeId: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountId">Descuento (Opcional)</Label>
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
                  <SelectValue placeholder="Sin descuento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin descuento</SelectItem>
                  {discounts.map((discount) => (
                    <SelectItem key={discount.id} value={discount.id.toString()}>
                      {discount.porcentaje}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Imagen del Producto</Label>
              <ImageDropzone
                value={formData.imageBase64}
                onChange={(value) => setFormData({ ...formData, imageBase64: value })}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Crear Producto</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogDescription>
              Actualiza la información del producto
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nombre</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nombre del producto"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Descripción</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe el producto..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">Precio</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(event) =>
                      setFormData({ ...formData, price: event.target.value })
                    }
                    placeholder="0.00"
                  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-productTypeId">Tipo de Producto</Label>
                <Select
                  value={formData.productTypeId.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, productTypeId: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-discountId">Descuento (Opcional)</Label>
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
                  <SelectValue placeholder="Sin descuento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin descuento</SelectItem>
                  {discounts.map((discount) => (
                    <SelectItem key={discount.id} value={discount.id.toString()}>
                      {discount.porcentaje}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Imagen del Producto</Label>
              <ImageDropzone
                value={formData.imageBase64}
                onChange={(value) => setFormData({ ...formData, imageBase64: value })}
              />
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
        title="¿Eliminar producto?"
        description={`Estás a punto de eliminar "${selectedProduct?.name}". Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
