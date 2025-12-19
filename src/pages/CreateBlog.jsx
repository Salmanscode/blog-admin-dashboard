import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { validateBlogForm } from '../utils/validators';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { ImageUpload } from '../components/shared/ImageUpload';

const CATEGORIES = [
    { value: '', label: 'Select Category' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Business', label: 'Business' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'Health', label: 'Health' },
    { value: 'Travel', label: 'Travel' },
];

const STATUS_OPTIONS = [
    { value: '', label: 'Select Status' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' },
];

export const CreateBlog = () => {
    const navigate = useNavigate();
    const { addBlog } = useBlog();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        author: '',
        image: null,
        publishDate: new Date().toISOString().split('T')[0],
        status: 'draft'
    });
    const [isDirty, setIsDirty] = useState(false);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setIsDirty(true);
    };

    const handleImageChange = (image) => {
        setFormData(prev => ({ ...prev, image }));
        setIsDirty(true);
        if (errors.image) {
            setErrors(prev => ({ ...prev, image: '' }));
        }
    };

    // Warn on unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const validation = validateBlogForm(formData);

        if (!formData.image) {
            validation.errors.image = 'Image is required';
            validation.isValid = false;
        }

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setIsSubmitting(true);

        try {
            addBlog(formData);
            navigate('/');
        } catch (error) {
            console.error('Error creating blog:', error);
            setErrors({ submit: 'Failed to create blog. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Create New Blog</h1>
                    <p className="text-slate-600 mt-1">Fill in the details to create a new blog post</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <Card className="p-8">
                    <div className="space-y-6">
                        {/* Title */}
                        <Input
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            error={errors.title}
                            required
                            placeholder="Enter blog title"
                        />

                        {/* Description */}
                        <Textarea
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            error={errors.description}
                            required
                            rows={6}
                            placeholder="Write your blog content here..."
                        />

                        {/* Grid for Category, Author, etc. */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Select
                                label="Category"
                                name="category"
                                options={CATEGORIES}
                                value={formData.category}
                                onChange={handleChange}
                                error={errors.category}
                                required
                            />

                            <Input
                                label="Author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                error={errors.author}
                                required
                                placeholder="Author name"
                            />

                            <Input
                                label="Publish Date"
                                name="publishDate"
                                type="date"
                                value={formData.publishDate}
                                onChange={handleChange}
                                error={errors.publishDate}
                                required
                            />

                            <Select
                                label="Status"
                                name="status"
                                options={STATUS_OPTIONS}
                                value={formData.status}
                                onChange={handleChange}
                                error={errors.status}
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <ImageUpload
                            value={formData.image}
                            onChange={handleImageChange}
                            error={errors.image}
                        />

                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600">{errors.submit}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-4 justify-end pt-4 border-t border-slate-200">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className='flex items-center gap-2'>
                                <Save size={20} />
                                {isSubmitting ? 'Creating...' : 'Create Blog'}
                            </Button>
                        </div>
                    </div>
                </Card>
            </form>
        </div>
    );
};
