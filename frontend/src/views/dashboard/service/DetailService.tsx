import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export default function DetailService() {
  return (
     <div className="bg-white rounded-3xl dark:bg-background p-5">
      {/* Header and Button */}
      <div className="flex items-center gap-4 justify-between mb-4">
        {/* Header */}
        <div>
          <h2 className="font-bold text-3xl capitalize">Detail Service</h2>
          <p className="text-gray-400 mt-2">View and Update Company Service</p>
        </div>
        {/* Button Create */}
        <Button>
          Add new <CirclePlus />
        </Button>
      </div>

      <hr />

      {/* Content Dashboard */}
      <div>Detail</div>
    </div>
  )
}
