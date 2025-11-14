import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useParams } from "react-router";

export default function DetailService() {
 const { id } = useParams<{ id: string }>();
  return (
     <div className="bg-white rounded-3xl dark:bg-background p-5">
      {/* Header and Button */}
      <div className="flex items-center gap-4 justify-between mb-4">
        {/* Header */}
        <div>
          <h2 className="font-bold text-3xl capitalize">Detail Service {id}</h2>
          <p className="text-gray-400 mt-2">View and Update Company Service</p>
        </div>
        {/* Button Create */}
        <Button>
          Add new <CirclePlus />
        </Button>
      </div>

      <hr />

      {/* Content Dashboard */}
      <div>Detail <p>ID Layanan yang dicari: **{id}**</p></div>
    </div>
  )
}
