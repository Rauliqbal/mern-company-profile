import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useServiceStore } from "@/stores/service";
import { ArrowLeft, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { config } from "@/config";
import { formatDate } from "@/lib/helper";

export default function DetailService() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const { serviceDetail, detailService, isLoading, updateService } =
    useServiceStore();

  useEffect(() => {
    if (id) detailService(id);
  }, [id, detailService]);

  useEffect(() => {
    if (serviceDetail) {
      setTitle(serviceDetail.title);
      setDesc(serviceDetail.description);
    }
  }, [serviceDetail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);

    if (file) {
      formData.append("image", file);
    }

    await updateService(id, formData);

    navigate("/dashboard/service");
  };

  return (
    <div className="bg-white rounded-3xl dark:bg-background p-">
      {/* Header */}
      <div className="flex items-center gap-4 justify-between mb-6">
        <div>
          <h2 className="font-bold text-3xl capitalize">
            Detail Service {serviceDetail?.title}
          </h2>
          <p className="text-gray-400 mt-2">
            Modify your service information
          </p>
        </div>

        <Link to="/dashboard/service">
          <Button variant="secondary">
            Back <ArrowLeft />
          </Button>
        </Link>
      </div>

      <hr />


      {/* Content Form */}
      <div className="w-full">

        {/* Loading */}
        {isLoading && (
          <div className="py-20 text-center text-gray-500">Loading...</div>
        )}

        {/* Form */}
        {!isLoading && serviceDetail && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

            {/* Preview Image */}
            <div>
              <label className="text-sm font-medium">Service Image</label>
              <div className="max-w-[25rem] mt-1">
                <div className="p-4 border rounded-lg dark:bg-input/40">
                  <img
                    src={file
                      ? URL.createObjectURL(file)
                      : `${config.API_URL}${serviceDetail.imageUrl}`
                    }
                    className="aspect-[4/3] object-cover rounded-md"
                  />

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-6 text-indigo-500" />
                      <span className="text-sm">{file?.name || "Current Image"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-semibold">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-semibold">Description</label>
              <textarea
                id="description"
                placeholder="Explain the details of your services..."
                rows={4}
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-1"
              />
            </div>

            {/* Dates */}
            <div className="flex gap-10 text-gray-500 text-sm mt-4">
              <p>
                <span className="font-semibold text-black dark:text-white">
                  Created at:
                </span>{" "}
                {formatDate(serviceDetail.createdAt)}
              </p>
              <p>
                <span className="font-semibold text-black dark:text-white">
                  Updated at:
                </span>{" "}
                {formatDate(serviceDetail.updatedAt)}
              </p>
            </div>

            <hr />

            {/* Buttons */}
            <div className="flex gap-4">
              <Link to="/dashboard/service">
                <Button variant="secondary">Back</Button>
              </Link>

              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
