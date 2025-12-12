import { useState, useEffect, useCallback } from 'react';
import { DataTable, type Column } from '../../components/DataTable';
import { DeleteDialog } from '../../components/DeleteDialog';
import { usersService, authService } from '../../lib/services';
import type { User } from '../../types';
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
import { toast } from 'sonner';
import { Badge } from '../../components/ui/badge';

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await usersService.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      toast.error('Error al cargar los usuarios');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns: Column<User>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    {
      key: 'createdAt',
      label: 'Fecha de Creación',
      render: (user) => new Date(user.createdAt).toLocaleDateString('es-ES'),
    },
    {
      key: 'updatedAt',
      label: 'Estado',
      render: () => <Badge variant="secondary">Activo</Badge>,
    },
  ];

  const handleCreate = () => {
    setFormData({ name: '', email: '', password: '' });
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({ name: user.name ?? '', email: user.email, password: '' });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setIsCreateDialogOpen(false);
      toast.success('Usuario creado exitosamente');
      fetchUsers();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      toast.error('Error al crear el usuario');
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    if (!formData.name || !formData.email) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    // Nota: La API actual no soporta actualización de usuarios
    toast.info('La funcionalidad de edición no está disponible en la API actual');
    setIsEditDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await usersService.delete(selectedUser.id);
      setIsDeleteDialogOpen(false);
      toast.success('Usuario eliminado exitosamente');
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      toast.error('Error al eliminar el usuario');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Usuarios</h2>
        <p className="text-muted-foreground mt-2">
          Gestiona los usuarios del sistema
        </p>
      </div>

      <DataTable
        data={users}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        createLabel="Crear Usuario"
        searchPlaceholder="Buscar usuarios..."
        emptyMessage="No hay usuarios registrados"
      />

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Usuario</DialogTitle>
            <DialogDescription>
              Completa la información para crear un nuevo usuario
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nombre completo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="usuario@ejemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
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
              <Button type="submit">Crear Usuario</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>
              Actualiza la información del usuario
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nombre</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nombre completo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="usuario@ejemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-password">Nueva Contraseña (opcional)</Label>
              <Input
                id="edit-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Dejar en blanco para no cambiar"
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
        title="¿Eliminar usuario?"
        description={`Estás a punto de eliminar al usuario "${selectedUser?.name}". Esta acción no se puede deshacer.`}
      />
    </div>
  );
}