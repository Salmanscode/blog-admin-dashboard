import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

export const EditBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getBlogById, updateBlog } = useBlog();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        author: '',
        image: null,
        publishDate: '',
        status: ''
    });
    const [isDirty, setIsDirty] = useState(false);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const blog = getBlogById(id);
        if (blog) {
            setFormData({
                title: blog.title,
                description: blog.description,
                category: blog.category,
                author: blog.author,
                image: blog.image,
                publishDate: blog.publishDate,
                status: blog.status
            });
        } else {
            setNotFound(true);
        }
    }, [id, getBlogById]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsDirty(true);
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
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
            updateBlog(id, formData);
            navigate('/');
        } catch (error) {
            console.error('Error updating blog:', error);
            setErrors({ submit: 'Failed to update blog. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (notFound) {
        return (
            <div className="max-w-4xl mx-auto">
                <Card className="p-12 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Blog Not Found</h2>
                    <p className="text-slate-600 mb-6">The blog post you're looking for doesn't exist.</p>
                    <Button onClick={() => navigate('/')}>
                        Back to Dashboard
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Edit Blog</h1>
                    <p className="text-slate-600 mt-1">Update your blog post details</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <Card className="p-8">
                    <div className="space-y-6">
                        <Input
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            error={errors.title}
                            required
                            placeholder="Enter blog title"
                        />

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

                        <ImageUpload
                            value={formData.image}
                            onChange={handleImageChange}
                            error={errors.image}
                        />

                        {errors.submit && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600">{errors.submit}</p>
                            </div>
                        )}

                        <div className="flex gap-4 justify-end pt-4 border-t border-slate-200">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting || !isDirty} className='flex items-center gap-2'>
                                <Save size={20} />
                                {isSubmitting ? 'Updating...' : 'Update Blog'}
                            </Button>
                        </div>
                    </div>
                </Card>
            </form>
        </div>
    );
};
