import React, { useRef } from 'react';

interface Props {
    images: File[];
    onChange: (files: File[]) => void;
}

export const ImageUploadStep: React.FC<Props> = ({ images, onChange }) => {
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const handleFileSelect = (index: number, fileList: FileList | null) => {
        if (!fileList) return;
        const updated = [...images];
        updated[index] = fileList[0]; // replace image at index
        onChange(updated.slice(0, 6));
    };

    const handleSlotClick = (index: number) => {
        inputRefs.current[index]?.click();
    };

    const renderImageSlot = (index: number) => {
        const file = images[index];
        const preview = file ? URL.createObjectURL(file) : null;

        return (
            <div
                key={index}
                className="w-full aspect-square border border-dashed rounded-lg cursor-pointer flex items-center justify-center overflow-hidden relative hover:border-[var(--heading-color)] transition"
                onClick={() => handleSlotClick(index)}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt={`image-${index}`}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <span className="text-gray-400 text-sm">
                        Click to upload
                    </span>
                )}

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={(el) => {
                        if (el) inputRefs.current[index] = el;
                    }}
                    onChange={(e) => handleFileSelect(index, e.target.files)}
                />
            </div>
        );
    };

    return (
        <div>
            <label className="block text-lg font-medium mb-3">
                Upload up to 6 images (min 1 required)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => renderImageSlot(i))}
            </div>
            {images.length < 1 && (
                <p className="text-sm text-red-500 mt-2">
                    Please upload at least 1 image.
                </p>
            )}
        </div>
    );
};
