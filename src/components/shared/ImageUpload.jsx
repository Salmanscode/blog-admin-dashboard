import React, { useState } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import { validateImage, fileToBase64 } from '../../utils/validators';

export const ImageUpload = ({ value, onChange, error }) => {
    const [preview, setPreview] = useState(value || null);
    const [validationError, setValidationError] = useState('');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate image
        const validation = validateImage(file);
        if (!validation.isValid) {
            setValidationError(validation.errors.join(', '));
            setPreview(null);
            onChange(null);
            return;
        }

        // Clear any previous errors
        setValidationError('');

        try {
            // Convert to base64
            const base64 = await fileToBase64(file);
            setPreview(base64);
            onChange(base64);
        } catch (error) {
            setValidationError('Failed to process image');
            console.error('Image conversion error:', error);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        setValidationError('');
        onChange(null);
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">
                Image <span className="text-red-500">*</span>
            </label>

            {!preview ? (
                <div className="mt-1">
                    <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 mb-3 text-slate-400" />
                            <p className="mb-2 text-sm text-slate-600">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-500">JPG or PNG (Max 1MB)</p>
                        </div>
                        <input
                            id="image-upload"
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            ) : (
                <div className="mt-1 relative">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {(validationError || error) && (
                <div className="mt-2 flex items-start gap-2 text-red-600">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{validationError || error}</p>
                </div>
            )}
        </div>
    );
};
