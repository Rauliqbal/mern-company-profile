import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { useServiceStore } from "@/stores/service";
import { CirclePlus } from "lucide-react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router";

export default function IndexService() {
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
        <NavLink to="/dashboard/create-service">
          <Button>
            Add new <CirclePlus />
          </Button>
        </NavLink>
      </div>

      <hr />

      {/* Content Dashboard */}
      <article>
        {service?.length === 0 ? (
          <p>Kosong</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {service?.map((service) => (
              <div key={service.id} className="flex items-center gap-4">
                <img
                className="aspect-square max-w-20 rounded-xl"
                  src={`${config.API_URL}${service.imageUrl}`}
                  alt={`cover ${service.title}`}
                />
                <p>{service.title}</p>
              </div>
              // <li key={item.id}>{item.title}</li>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
