// Validators for blog forms
export const validateImage = (file) => {
    const errors = [];

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        errors.push('Only JPG and PNG images are allowed');
    }

    // Check file size (max 1MB = 1048576 bytes)
    const maxSize = 1048576;
    if (file.size > maxSize) {
        errors.push('Image size must be less than 1MB');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateBlogForm = (formData) => {
    const errors = {};

    if (!formData.title || formData.title.trim() === '') {
        errors.title = 'Title is required';
    }

    if (!formData.description || formData.description.trim() === '') {
        errors.description = 'Description is required';
    }

    if (!formData.category || formData.category === '') {
        errors.category = 'Category is required';
    }

    if (!formData.author || formData.author.trim() === '') {
        errors.author = 'Author is required';
    }

    if (!formData.publishDate) {
        errors.publishDate = 'Publish date is required';
    }

    if (!formData.status) {
        errors.status = 'Status is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Convert file to base64 for storage
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
