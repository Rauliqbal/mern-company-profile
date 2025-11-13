import { Button } from "@/components/ui/button";
import { useServiceStore } from "@/stores/service";
import { CirclePlus } from "lucide-react";
import { useEffect } from "react";

export default function Service() {
  const { service, fetchService } = useServiceStore();

  useEffect(() => {
    fetchService();
  }, [fetchService]);
  return (
    <div className="bg-white rounded-3xl dark:bg-background p-5">
      {/* Header and Button */}
      <div className="flex items-center gap-4 justify-between mb-4">
        {/* Header */}
        <div>
          <h2 className="font-bold text-3xl capitalize">Manage Service</h2>
          <p className="text-gray-400 mt-2">View and Update Company Services</p>
        </div>
        {/* Button Create */}
        <Button>
          Add new <CirclePlus />
        </Button>
      </div>

      <hr />

      {/* Content Dashboard */}
      <article>
        {service?.length === 0 ? (
          <p>Kosong</p>
        ): (
          <ul>
            {service?.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
          </ul>
        )}
      </article>
    </div>
  );
}
