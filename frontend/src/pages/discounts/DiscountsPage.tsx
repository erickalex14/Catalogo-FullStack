import { useEffect, useMemo, useState } from 'react';
import { DataTable, type Column } from '../../components/DataTable';
import { DeleteDialog } from '../../components/DeleteDialog';
import type { Discount } from '../../types/index';
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
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import { discountsService } from '../../lib/services';
import { Loader2 } from 'lucide-react';

export function DiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ porcentaje: number }>({ porcentaje: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await discountsService.getAll();
        setDiscounts(data);
      } catch (err) {
        setError('Error al cargar los descuentos. Verifica que el backend esté activo.');
        toast.error('No se pudieron cargar los descuentos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  const columns: Column<Discount>[] = useMemo(
    () => [
      { key: 'id', label: 'ID' },
      {
        key: 'porcentaje',
        label: 'Porcentaje',
        render: (discount) => (
          <Badge variant="secondary" className="bg-green-500/10 text-green-700">
            {discount.porcentaje}%
          </Badge>
        ),
      },
      {
        key: 'createdAt',
        label: 'Creado',
        render: (discount) => new Date(discount.createdAt).toLocaleDateString(),
      },
    ],
    []
  );

  const resetForm = () => setFormData({ porcentaje: 0 });

  const handleCreate = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (discount: Discount) => {
    setSelectedDiscount(discount);
    setFormData({ porcentaje: discount.porcentaje });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (discount: Discount) => {
    setSelectedDiscount(discount);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.porcentaje < 1 || formData.porcentaje > 100) {
      toast.error('El porcentaje debe estar entre 1 y 100');
      return;
    }

    try {
      const newDiscount = await discountsService.create({ porcentaje: formData.porcentaje });
      setDiscounts([...discounts, newDiscount]);
      setIsCreateDialogOpen(false);
      toast.success('Descuento creado correctamente');
    } catch (err) {
      toast.error('Error al crear el descuento');
      console.error(err);
    }
  };

  const handleSubmitEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedDiscount) return;
    if (formData.porcentaje < 1 || formData.porcentaje > 100) {
      toast.error('El porcentaje debe estar entre 1 y 100');
      return;
    }

    try {
      const updated = await discountsService.update(selectedDiscount.id, {
        porcentaje: formData.porcentaje,
      });
      setDiscounts(
        discounts.map((discount) => (discount.id === selectedDiscount.id ? updated : discount))
      );
      setIsEditDialogOpen(false);
      toast.success('Descuento actualizado correctamente');
    } catch (err) {
      toast.error('Error al actualizar el descuento');
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedDiscount) return;
    try {
      await discountsService.delete(selectedDiscount.id);
      setDiscounts(discounts.filter((discount) => discount.id !== selectedDiscount.id));
      setIsDeleteDialogOpen(false);
      toast.success('Descuento eliminado correctamente');
    } catch (err) {
      toast.error('Error al eliminar el descuento');
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
        <Button onClick={() => void reloadData()}>Reintentar</Button>
      </div>
    );
  }

  const reloadData = async () => {
    try {
      setLoading(true);
      const data = await discountsService.getAll();
      setDiscounts(data);
      setError(null);
    } catch (err) {
      setError('Error al recargar los descuentos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Descuentos</h2>
        <p className="text-muted-foreground mt-2">
          Gestiona los porcentajes de descuento disponibles
        </p>
      </div>

      <DataTable
        data={discounts}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        createLabel="Crear Descuento"
        searchPlaceholder="Buscar descuentos..."
        emptyMessage="No hay descuentos registrados"
      />

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Descuento</DialogTitle>
            <DialogDescription>
              Define un nuevo porcentaje de descuento
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="porcentaje">Porcentaje</Label>
              <div className="relative">
                <Input
                  id="porcentaje"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.porcentaje}
                  onChange={(event) =>
                    setFormData({ ...formData, porcentaje: Number(event.target.value) })
                  }
                  placeholder="Ej: 15"
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
              <p className="text-muted-foreground">Ingresa un valor entre 1 y 100</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Crear Descuento</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Descuento</DialogTitle>
            <DialogDescription>
              Actualiza el porcentaje de descuento
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-porcentaje">Porcentaje</Label>
              <div className="relative">
                <Input
                  id="edit-porcentaje"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.porcentaje}
                  onChange={(event) =>
                    setFormData({ ...formData, porcentaje: Number(event.target.value) })
                  }
                  placeholder="Ej: 15"
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  %
                </span>
              </div>
              <p className="text-muted-foreground">Ingresa un valor entre 1 y 100</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Guardar Cambios</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar descuento?"
        description={`Estás a punto de eliminar el descuento del ${selectedDiscount?.porcentaje ?? 0}%. Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
