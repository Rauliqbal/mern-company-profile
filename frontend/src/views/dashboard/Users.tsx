import { useEffect, useMemo } from "react"
import { DataTable } from "@/components/DataTable"
import { useUserStore } from "@/stores/user"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button" // Gunakan button dari shadcn
import { Loader2, MoreHorizontal } from "lucide-react" // Untuk ikon aksi

type User = {
  id: string
  name: string
  email: string
}

export default function Users() {
  const {fetchAllUser,allUsers,isLoading } = useUserStore() 

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      { 
        accessorKey: "name", 
        header: "Nama Lengkap",
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>
      },
      { 
        accessorKey: "email", 
        header: "Alamat Email" 
      },
      { 
        id: "actions", 
        header: "Aksi",
        cell: ({ row }) => (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => console.log("Editing ID:", row.original.id)}
          >
            <MoreHorizontal className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) 
      },
    ],
    []
  )

  const data: User[] = [
    { id: "1", name: "Rizky", email: "rizky@example.com" },
    { id: "2", name: "Ahmad", email: "ahmad@example.com" },
  ] 

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser])

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Manage Users Page 👥</h2>
        {isLoading && <Loader2 className="animate-spin" />}
      </div>

      <DataTable columns={columns} data={allUsers} />
    </div>
  )
}