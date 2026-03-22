import { useEffect, useMemo, useState } from "react"
import { DataTable } from "@/components/DataTable"
import { useUserStore } from "@/stores/user"
import { Button } from "@/components/ui/button"
import { Loader2, MoreHorizontal, Trash2, User, UserPen, UserPlus2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { ColumnDef } from "@tanstack/react-table"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { useAuthStore } from "@/stores/auth"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

type User = {
  id: string
  name: string
  email: string
  role: string
  isVerified: boolean
}

export default function Users() {
  const { fetchAllUser, allUsers, isLoading, createUser, updateUser, deleteUser } = useUserStore()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("raul.iqbal@vensys.co.id");
  const [password, setPassword] = useState("@Rauliqbal");
  const [confirmPassword, setConfirmPassword] = useState("@Rauliqbal");

  const columns = useMemo<ColumnDef<User, any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nama Lengkap",
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>
      },
      {
        accessorKey: "email",
        header: "Email"
      },
      {
        accessorKey: "isVerified",
        header: "Status",
        cell: ({ row }) => {
          const isVerified = row.getValue("isVerified") as boolean;

          return (
            <Badge variant={isVerified ? "default" : "destructive"}>
              {isVerified ? "Active" : "Inactive"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.getValue("role") as string;
          return (
            <span>
              {role === "ADMIN" ? "Admin" : "Employee"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
          const user = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuItem onClick={() => {
                  setSelectedUser(user)
                  setIsEditOpen(true)
                }}>
                  <UserPen className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  setIsDeleteOpen(true)
                  setUserToDelete(user);
                }} variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    []
  )

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password tidak sama");
      return;
    }

    const res = await createUser(name, email, password, confirmPassword);
    if (res.success) {
      toast.success(res.message);
      setIsAddOpen(false);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      toast.error(res.message);
    }
    setIsAddOpen(false)
  }

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedUser) return;

    const payload: any = {};

    if (name !== selectedUser.name) payload.name = name;
    if (email !== selectedUser.email) payload.email = email;
    if (password) {
      if (password !== confirmPassword) {
        toast.error("Password tidak sama");
        return;
      }
      payload.password = password;
    }

    if (Object.keys(payload).length === 0) {
      toast.error("Tidak ada perubahan");
      return;
    }

    const res = await updateUser(selectedUser.id, payload);

    if (res.success) {
      toast.success(res.message);
      setIsEditOpen(false);
    } else {
      toast.error(res.message);
    }
  }


  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPassword("");
      setConfirmPassword("");
    }
  }, [selectedUser])

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser])

  return (
    <>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User List</h2>
          <p className="text-muted-foreground">Manage your users and their roles here.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>Add User <UserPlus2 /></Button>
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter users..."
          className="max-w-sm"
        />
      </div>
      <DataTable columns={columns} data={allUsers} />

      {/* Update User Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <form onSubmit={handleUpdateUser}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Perbarui informasi user di sini. Klik simpan setelah selesai.
              </DialogDescription>
            </DialogHeader>

            <div>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Full name</FieldLabel>
                    <Input
                      id="name"
                      autoComplete="off"
                      placeholder="John doe"
                      value={name} onChange={(e) => setName(e.target.value)} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      autoComplete="off"
                      placeholder="john@mail.com"
                      value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      autoComplete="off"
                      placeholder="••••••"
                      value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confPassword">Confirm Password</FieldLabel>
                    <Input
                      id="confPassword"
                      autoComplete="off"
                      placeholder="••••••"
                      value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>Batal</Button>
              <Button type="submit" onClick={handleUpdateUser}>Simpan Perubahan</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      {/* Create User Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <form onSubmit={handleAddUser}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User
              </DialogTitle>
              <DialogDescription>
                Create new user here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Full name</FieldLabel>
                    <Input
                      id="name"
                      autoComplete="off"
                      placeholder="John doe"
                      value={name} onChange={(e) => setName(e.target.value)} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      autoComplete="off"
                      placeholder="john@mail.com"
                      value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      autoComplete="off"
                      placeholder="••••••"
                      value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confPassword">Confirm Password</FieldLabel>
                    <Input
                      id="confPassword"
                      autoComplete="off"
                      placeholder="••••••"
                      value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={handleAddUser}>Save user</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      {/* Delete User Dialoag */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-bold">{userToDelete?.name}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive"
              onClick={async () => {
                if (!userToDelete) return;
                const res = await deleteUser(userToDelete.id)
                if (res.success) {
                  toast.success(res.message);
                } else {
                  toast.error(res.message);
                }
                setIsDeleteOpen(false);
                setUserToDelete(null);
              }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}