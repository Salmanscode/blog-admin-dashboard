// Schema migration utilities
const CURRENT_SCHEMA_VERSION = 2;

// Migration functions for each version
const migrations = {
    1: (data) => {
        // Version 1: Ensure all blogs have a status field
        return data.map(blog => ({
            ...blog,
            status: blog.status || 'draft'
        }));
    },
    2: (data) => {
        // Version 2: Ensure all blogs have createdAt and updatedAt timestamps
        return data.map(blog => ({
            ...blog,
            createdAt: blog.createdAt || blog.publishDate || new Date().toISOString(),
            updatedAt: blog.updatedAt || new Date().toISOString()
        }));
    }
};

export const migrateData = (data, currentVersion = 0) => {
    // Ensure we are working with an array
    let migratedData = Array.isArray(data) ? data : [];

    // Apply migrations sequentially from current version to target version
    for (let version = currentVersion + 1; version <= CURRENT_SCHEMA_VERSION; version++) {
        if (migrations[version]) {
            migratedData = migrations[version](migratedData);
            console.log(`✅ Migration to version ${version} completed`);
        }
    }

    return migratedData;
};

export const getCurrentSchemaVersion = () => CURRENT_SCHEMA_VERSION;

export const getStoredSchemaVersion = () => {
    const version = localStorage.getItem('blogSchemaVersion');
    return version ? parseInt(version, 10) : 0;
};

export const setSchemaVersion = (version) => {
    localStorage.setItem('blogSchemaVersion', version.toString());
};
