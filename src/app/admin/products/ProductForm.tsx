"use client";

import React, { useRef, useState } from "react";
import { useActionState } from "react";
import { type ProductState } from "./actions";
import { uploadProductImage } from "./upload-action";

type ProductFormProps = {
  action: (
    prevState: ProductState,
    formData: FormData
  ) => Promise<ProductState>;
  product?: {
    id?: string;
    name: string;
    brand: string;
    price: number;
    scentFamily: string;
    description: string;
    image: string;
    featured: boolean;
  };
  submitLabel: string;
};

const scentFamilies = [
  "Woody",
  "Floral",
  "Citrus",
  "Amber",
  "Oriental",
  "Fresh",
  "Gourmand",
];

export default function ProductForm({
  action,
  product,
  submitLabel,
}: ProductFormProps) {
  const [state, formAction, pending] = useActionState<ProductState, FormData>(
    action,
    {}
  );

  // Image upload state
  const [imageUrl, setImageUrl] = useState<string>(product?.image ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);

    const result = await uploadProductImage(fd);

    setUploading(false);

    if (result.error) {
      setUploadError(result.error);
      // Reset the file input so the user can try again
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (result.url) {
      setImageUrl(result.url);
    }
  }

  return (
    <form
      action={formAction}
      className="space-y-8 max-w-2xl"
      onSubmit={() => setUploadError("")}
    >
      {product?.id && <input type="hidden" name="id" value={product.id} />}

      {/* Error message */}
      {state.error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm tracking-wide">
          {state.error}
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-[10px] tracking-widest uppercase text-stone-500 font-medium mb-2"
        >
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name}
          className="w-full bg-white border border-stone-200 text-stone-900 text-sm font-light tracking-wide px-4 py-3 focus:outline-none focus:border-stone-900 transition-all placeholder-stone-400"
          placeholder="e.g. Santale Noir"
        />
      </div>

      {/* Brand */}
      <div>
        <label
          htmlFor="brand"
          className="block text-[10px] tracking-widest uppercase text-stone-500 font-medium mb-2"
        >
          Brand
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          required
          defaultValue={product?.brand ?? "Essence"}
          className="w-full bg-white border border-stone-200 text-stone-900 text-sm font-light tracking-wide px-4 py-3 focus:outline-none focus:border-stone-900 transition-all placeholder-stone-400"
          placeholder="Essence"
        />
      </div>

      {/* Price + Scent Family row */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="price"
            className="block text-[10px] tracking-widest uppercase text-stone-500 font-medium mb-2"
          >
            Price (USD)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min="0"
            step="0.01"
            defaultValue={product?.price}
            className="w-full bg-white border border-stone-200 text-stone-900 text-sm font-light tracking-wide px-4 py-3 focus:outline-none focus:border-stone-900 transition-all placeholder-stone-400"
            placeholder="185"
          />
        </div>
        <div>
          <label
            htmlFor="scentFamily"
            className="block text-[10px] tracking-widest uppercase text-stone-500 font-medium mb-2"
          >
            Scent Family
          </label>
          <select
            id="scentFamily"
            name="scentFamily"
            required
            defaultValue={product?.scentFamily}
            className="w-full bg-white border border-stone-200 text-stone-900 text-sm font-light tracking-wide px-4 py-3 focus:outline-none focus:border-stone-900 transition-all"
          >
            <option value="">Select...</option>
            {scentFamilies.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-[10px] tracking-widest uppercase text-stone-500 font-medium mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={product?.description}
          className="w-full bg-white border border-stone-200 text-stone-900 text-sm font-light tracking-wide px-4 py-3 focus:outline-none focus:border-stone-900 transition-all placeholder-stone-400 resize-none"
          placeholder="A dark, sophisticated blend of..."
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-[10px] tracking-widest uppercase text-stone-500 font-medium mb-2">
          Product Image
        </label>

        {/* File picker */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="image-upload"
            className={`cursor-pointer bg-white border border-stone-200 text-stone-600 text-xs font-medium tracking-widest uppercase px-6 py-3 hover:border-stone-900 hover:text-stone-900 transition-all ${
              uploading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Choose File"}
          </label>
          <input
            ref={fileInputRef}
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          {uploading && (
            <span className="text-xs text-stone-400 tracking-wide animate-pulse">
              Uploading image to Vercel Blob...
            </span>
          )}
        </div>

        {/* Upload error */}
        {uploadError && (
          <p className="mt-2 text-xs text-red-600 tracking-wide">{uploadError}</p>
        )}

        {/* Hidden field submits the URL to the main product save action */}
        <input type="hidden" name="image" value={imageUrl} />

        {/* Preview */}
        {imageUrl && !uploading && (
          <div className="mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Product preview"
              className="w-32 h-44 object-cover bg-stone-100 border border-stone-200"
            />
            <p className="mt-1 text-[10px] text-stone-400 tracking-wide break-all">
              {imageUrl}
            </p>
          </div>
        )}
      </div>

      {/* Featured toggle */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={product?.featured}
          className="w-4 h-4 text-stone-900 border-stone-300 focus:ring-stone-900"
        />
        <label
          htmlFor="featured"
          className="text-sm text-stone-600 font-light tracking-wide"
        >
          Featured on homepage
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending || uploading}
        className="bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-xs font-medium tracking-[0.15em] uppercase px-8 py-4 transition-colors duration-300"
      >
        {pending ? "Saving..." : uploading ? "Upload in progress..." : submitLabel}
      </button>
    </form>
  );
}
