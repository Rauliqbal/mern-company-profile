import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { config } from "@/config";
import { formatDate } from "@/lib/helper";
import { useServiceStore } from "@/stores/service";
import {
  ArrowLeft,
  FileText,
  LucideTrash2,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function DetailService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { serviceDetail, detailService, updateService, isLoading } =
    useServiceStore();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE = 2 * 1024 * 1024;

  useEffect(() => {
    if (id) detailService(id);
  }, [id, detailService]);

  useEffect(() => {
    if (serviceDetail) {
      setTitle(serviceDetail.title || "");
      setDesc(serviceDetail.description || "");
      setPreview(serviceDetail.image_url ? `${config.API_URL}${serviceDetail.image_url}` : null);
    }
  }, [serviceDetail]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > MAX_FILE) {
      toast.error("Max file size is 2MB.");
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (!dropped) return;
    if (dropped.size > MAX_FILE) {
      toast.error("Max file size is 2MB.");
      return;
    }
    setFile(dropped);
    setPreview(URL.createObjectURL(dropped));
    setIsDragging(false);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // UPDATE SERVICE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !desc) {
      toast.warn("Title & description required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);

   if (file) {
    formData.append("imageUrl", file);
  }


    try {
      await updateService(id!, formData);
      toast.success("Updated successfully!");
      // navigate("/dashboard/service");
    } catch (error) {
      toast.error("Failed to update service");
    }
  };

  return (
    <div className="bg-white dark:bg-background rounded-3xl p-8 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Update Service</h2>
          <p className="text-gray-500">Modify the selected service.</p>
        </div>

        <Link to="/dashboard/service">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </Link>
      </div>

      <hr className="mb-6" />

      {/* Content Form */}
      <div className="w-full">

        {/* Loading */}
        {isLoading && (
          <div className="py-20 text-center text-gray-500">Loading...</div>
        )}

        {/* Form */}
        {!isLoading && serviceDetail && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Service Image</label>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />

              {preview ? (
                <div className="max-w-[25rem] mt-1">
                  <div className="p-4 border rounded-lg dark:bg-input/40">
                    <img
                      src={preview}
                      className="aspect-[4/3] object-cover rounded-md"
                    />

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-6 text-indigo-500" />
                        <span className="text-sm">{file?.name || "Current Image"}</span>
                      </div>

                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-600 hover:text-red-800"
                      >
                        <LucideTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer h-48 transition duration-300 ${isDragging
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-300 dark:border-input hover:border-indigo-400"
                    }`}
                >
                  <Upload className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-indigo-600">Click</span> or
                    drag image here
                  </p>
                  <p className="text-xs text-gray-500">Max 2MB (JPG/PNG/WEBP)</p>
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-medium">Service Name</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Example: Web Design"
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full rounded-md border dark:bg-input/30 mt-1 p-3"
                placeholder="Explain your service..."
              />
            </div>

            {/* Dates */}
            <div className="flex gap-10 text-gray-500 text-sm mt-4">
              <p>
                <span className="font-semibold text-black dark:text-white">
                  Created at:
                </span>{" "}
                {formatDate(serviceDetail.created_at)}
              </p>
              <p>
                <span className="font-semibold text-black dark:text-white">
                  Updated at:
                </span>{" "}
                {formatDate(serviceDetail.updated_at)}
              </p>
            </div>

            <hr />

            {/* Submit */}
            <Button type="submit" className="ml-auto w-fit">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        )}

      </div>

    </div>
  );
}
