import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useServiceStore } from "@/stores/service";
import { ArrowLeft, FileText, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function CreateService() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { createService } = useServiceStore();
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const max_file = 2 * 1024 * 1024; // 2MB

  // event handler input select
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) { 
        if (selectedFile.size > max_file) { 
            toast.error(
                "The maximum file size is 2MB. Please select a smaller file."
            );
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }
        setFile(selectedFile);
    }
};

  // handle click image input
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function DragEvent
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile.size > max_file) {
      toast.error("The maximum file size is 2MB. Please select a smaller file.")
      return
    }

      setFile(droppedFile);

  };

  // Function for delete file has input
  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle Create Service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !desc || !file) {
      toast.warn("Please complete all fields (Title, Description, and Image).");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);

    if (file) {
      formData.append("imageUrl", file); // Pastikan 'image' sesuai dengan nama field di backend
    }

    try {
      await createService(formData);

      toast.success("Created Service Successfully!");
      setTitle("");
      setDesc("");
      setFile(null);
      navigate("/dashboard/service");
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || "Failed to save service.";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="bg-white rounded-3xl dark:bg-background p-8 shadow-md">
      {/* Header and Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-3xl capitalize">Create Service</h2>
          <p className="text-gray-500 mt-1">
            Fill the form to add a new service.
          </p>
        </div>
        <Link to="/dashboard/service">
          <Button variant={"secondary"}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </Link>
      </div>

      <hr className="mb-8" />

      {/* Content Form */}
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dropzone / File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Image Service
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />

            {file ? (
              //  View file Image
              <div className="p-4 border border-gray-300 rounded-lg flex justify-between items-center bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-indigo-500" />
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {file.name}
                  </span>
                </div>
                <button
                  type="button" // Penting untuk mencegah submit form
                  onClick={removeFile}
                  className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Hapus
                </button>
              </div>
            ) : (
              // Dropzone (Drag and Drop Area)
              <div
                onClick={handleButtonClick}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
                  flex mt-1 flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg 
                  cursor-pointer transition-colors duration-300 h-48
                  ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
                  }
                `}
              >
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <p className="mb-1 text-sm text-gray-500 text-center">
                  <span className="font-semibold text-indigo-600  ">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500 text-center">
                  JPG, PNG, SVG or WEBP (MAX. 800x400px)
                </p>
              </div>
            )}
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none"
              >
                Name Service
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Example: Web Designer, Application"
                className="mt-1"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            {/* <div>
                <label htmlFor="price" className="text-sm font-medium leading-none">
                    Price
                </label>
                <Input
                    id="price"
                    type="number"
                    placeholder="Example: 500000"
                    className="mt-1"
                />
            </div> */}

            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium leading-none"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Explain the details of your services..."
                rows={4}
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-1"
              />
            </div>
          </div>

          {/* C. Submit Button */}
          <Button type="submit" className="ml-auto w-fit">
            Save new service
          </Button>
        </form>
      </div>
    </div>
  );
}
