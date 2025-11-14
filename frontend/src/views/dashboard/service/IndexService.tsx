import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { formatDate } from "@/lib/helper";
import { useServiceStore } from "@/stores/service";
import { CirclePlus, Clock } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";

export default function IndexService() {
  const { service, fetchService, isLoading } = useServiceStore();
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
        <Link to="/dashboard/create-service">
          <Button>
            Add new <CirclePlus />
          </Button>
        </Link>
      </div>

      <hr />

      {/* Content Dashboard */}
      <article className="mt-4">
        {service?.length === 0 ? (
          <p>Kosong</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {isLoading || service === null ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <ServiceSkeleton key={index} />
                ))}
              </>
            ) : (
              service?.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="aspect-[4/3] max-w-28 rounded-lg"
                      src={`${config.API_URL}${service.imageUrl}`}
                      alt={`cover ${service.title}`}
                    />
                    <p className="w-80 max-w-full">{service.title}</p>
                  </div>

                  <p className="w-80 max-w-full flex items-center gap-1 text-gray-600 text-sm">
                    <Clock width={20} />
                    {formatDate(service.createdAt)}
                  </p>

                  <Link to={`/service/${service.id}`}>
                    <Button variant={"secondary"}>Edit Service</Button>
                  </Link>
                </div>
                // <li key={item.id}>{item.title}</li>
              ))
            )}
            {}
          </div>
        )}
      </article>
    </div>
  );
}

const ServiceSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-4 p-2 border border-transparent animate-pulse">
      <div className="flex items-center gap-3">
        <div className="aspect-[4/3] max-w-28 h-[84px] rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
      </div>

      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 hidden sm:flex"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
    </div>
  );
};
