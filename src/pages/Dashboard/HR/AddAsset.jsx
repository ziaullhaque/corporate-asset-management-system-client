import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../utils";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Upload, Package, Hash, Layers } from "lucide-react";

const AddAsset = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    isPending,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/assets`, payload),

    onSuccess: () => {
      Swal.fire({
        title: "Asset Added Successfully!",
        icon: "success",
      });
      mutationReset();
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Asset",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const imageURL = await imageUpload(data.productImage[0]);

      const assetData = {
        productName: data.productName,
        productImage: imageURL,
        productType: data.productType,
        productQuantity: Number(data.productQuantity),
        availableQuantity: Number(data.productQuantity),
        dateAdded: new Date(),
        hrEmail: user?.email,
        companyName: user?.companyName || "Unknown",
      };

      await mutateAsync(assetData);
      reset();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/20 pb-2 mb-8 flex items-center gap-2">
        <Package size={22} /> Add New Asset
      </h2>

      <div className="bg-white rounded-xl shadow-lg border p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <Hash size={18} /> Product Name{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full py-2 border-b border-gray-300 focus:border-primary focus:outline-none"
              {...register("productName", {
                required: "Product Name is required",
              })}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm">
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Upload size={18} /> Product Image{" "}
              <span className="text-red-500">*</span>
            </label>

            <label
              htmlFor="product-image"
              className="flex items-center border-b h-12 cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4 px-2">
                <Upload size={20} className="text-gray-400" />
                <span className="text-sm text-gray-500">Choose file</span>
              </div>

              <input
                id="product-image"
                type="file"
                className="hidden"
                accept="image/*"
                {...register("productImage", {
                  required: "Product Image is required",
                })}
              />
            </label>

            {errors.productImage && (
              <p className="text-red-500 text-sm">
                {errors.productImage.message}
              </p>
            )}
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <Layers size={18} /> Product Type{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:border-primary focus:outline-none"
              {...register("productType", {
                required: "Product Type is required",
              })}
            >
              <option value="">Select type</option>
              <option value="hardware">Hardware</option>
              <option value="software">Softwar</option>
              <option value="license">License</option>
            </select>

            {errors.productType && (
              <p className="text-red-500 text-sm">
                {errors.productType.message}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter quantity"
              className="w-full py-2 border-b border-gray-300 focus:border-primary focus:outline-none"
              {...register("productQuantity", {
                required: "Product Quantity is required",
                min: { value: 1, message: "Minimum quantity is 1" },
              })}
            />
            {errors.productQuantity && (
              <p className="text-red-500 text-sm">
                {errors.productQuantity.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-md font-medium active:scale-95 transition"
          >
            {loading || isPending ? (
              <ImSpinner9 className="animate-spin m-auto" />
            ) : (
              "Add Asset"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;

