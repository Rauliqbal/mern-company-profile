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
import { Label } from "@/components/ui/label"
import { Field, FieldLabel } from "@/components/ui/field"

type User = {
  id: string
  name: string
  email: string
  role: string
  isVerified: boolean
}

export default function Users() {
  const { fetchAllUser, allUsers, isLoading } = useUserStore()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

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
                <DropdownMenuItem variant="destructive">
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

  const handleSave = () => {
    console.log("Data yang akan dikirim:", selectedUser)
    setIsEditOpen(false)
  }

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser])

  return (
    <>
      <div className="pt-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User List</h2>
          <p className="text-muted-foreground">Manage your users and their roles here.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>Add User <UserPlus2 /></Button>
      </div>

      {/* {isLoading && <Loader2 className="animate-spin" />} */}

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter users..."
          className="max-w-sm"
        />
      </div>
      <DataTable columns={columns} data={allUsers} />

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Perbarui informasi user di sini. Klik simpan setelah selesai.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">Nama</label>
              <Input
                id="name"
                className="col-span-3"
                value={selectedUser?.name || ""}
                onChange={(e) => setSelectedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">Email</label>
              <Input
                id="email"
                disabled
                className="col-span-3 opacity-70"
                value={selectedUser?.email || ""}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Batal</Button>
            <Button type="submit" onClick={handleSave}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User
            </DialogTitle>
            <DialogDescription>
              Create new user here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nama</Label>
              <Input
                id="name"
                className="col-span-3"
                value={selectedUser?.name || ""}
                onChange={(e) => setSelectedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
              />

              <Field>
                <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
                <Input
                  id="input-field-username"
                  type="text"
                  placeholder="Enter your username"
                />
              </Field>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                disabled
                className="col-span-3 opacity-70"
                value={selectedUser?.email || ""}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Batal</Button>
            <Button type="submit" onClick={handleSave}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}