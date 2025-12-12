import { useState, useEffect, useCallback } from 'react';
import { DataTable, type Column } from '../../../components/DataTable';
import { DeleteDialog } from '../../../components/DeleteDialog';
import { productTypesService } from '../../../lib/services';
import type { ProductType } from '../../../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { toast } from 'sonner';

export function ProductTypesPage() {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ProductType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const fetchProductTypes = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await productTypesService.getAll();
      setProductTypes(data);
    } catch (error) {
      console.error('Error al cargar tipos de producto:', error);
      toast.error('Error al cargar los tipos de producto');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  const columns: Column<ProductType>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'description', label: 'Descripción' },
  ];

  const handleCreate = () => {
    setFormData({ name: '', description: '' });
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (type: ProductType) => {
    setSelectedType(type);
    setFormData({ name: type.name, description: type.description ?? '' });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (type: ProductType) => {
    setSelectedType(type);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    try {
      await productTypesService.create(formData);
      setIsCreateDialogOpen(false);
      toast.success('Tipo de producto creado exitosamente');
      fetchProductTypes();
    } catch (error) {
      console.error('Error al crear tipo de producto:', error);
      toast.error('Error al crear el tipo de producto');
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;
    if (!formData.name || !formData.description) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    try {
      await productTypesService.update(selectedType.id, formData);
      setIsEditDialogOpen(false);
      toast.success('Tipo de producto actualizado exitosamente');
      fetchProductTypes();
    } catch (error) {
      console.error('Error al actualizar tipo de producto:', error);
      toast.error('Error al actualizar el tipo de producto');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedType) return;
    try {
      await productTypesService.delete(selectedType.id);
      setIsDeleteDialogOpen(false);
      toast.success('Tipo de producto eliminado exitosamente');
      fetchProductTypes();
    } catch (error) {
      console.error('Error al eliminar tipo de producto:', error);
      toast.error('Error al eliminar el tipo de producto');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Tipos de Producto</h2>
        <p className="text-muted-foreground mt-2">
          Gestiona las categorías de productos
        </p>
      </div>

      <DataTable
        data={productTypes}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        createLabel="Crear Tipo"
        searchPlaceholder="Buscar tipos..."
        emptyMessage="No hay tipos de producto registrados"
      />

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Tipo de Producto</DialogTitle>
            <DialogDescription>
              Define una nueva categoría de productos
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Electrónica"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe el tipo de producto..."
                rows={3}
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
              <Button type="submit">Crear Tipo</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Tipo de Producto</DialogTitle>
            <DialogDescription>
              Actualiza la información del tipo de producto
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nombre</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Electrónica"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Descripción</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe el tipo de producto..."
                rows={3}
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
        title="¿Eliminar tipo de producto?"
        description={`Estás a punto de eliminar el tipo "${selectedType?.name}". Esta acción no se puede deshacer.`}
      />
    </div>
  );
}