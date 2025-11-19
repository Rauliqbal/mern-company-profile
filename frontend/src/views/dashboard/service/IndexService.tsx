import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { formatDate } from "@/lib/helper";
import { useServiceStore } from "@/stores/service";
import { CirclePlus, Clock } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";

export default function IndexService() {
  const { services, isLoading } = useServiceStore();
  const fetchService = useServiceStore((state) => state.fetchService);
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
        {services?.length === 0 ? (
         <div className="flex justify-center text-center py-40">
          <div className="flex items-center justify-center flex-col ">
            <img className="max-w-40" src="/empty.png" alt="" />
           <p className="text-2xl font-semibold mt-3">No service data available</p>
           <p className="text-gray-400 mt-2">Please create a new item first</p>
          </div>
         </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {isLoading || services === null ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <ServiceSkeleton key={index} />
                ))}
              </>
            ) : (
              services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="aspect-[4/3] max-w-28 rounded-lg"
                      src={`${config.API_URL}${service.image_url}`}
                      alt={`cover ${service.title}`}
                    />
                    <p className="w-40 line-clamp-1 max-w-full">{service.title}</p>
                  </div>

                  <p className="w-40 max-w-full flex items-center gap-1 text-gray-600 text-sm">
                    <Clock width={20} />
                    {formatDate(service.updated_at)}
                  </p>

                  <Link to={`/dashboard/service/${service.id}`}>
                    <Button variant={"secondary"}>Edit Service</Button>
                  </Link>
                </div>
              ))
            )}
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
