// Utilidades para manejo de autenticación

export const isUserAuthenticated = () => {
    try {
        const userInfo = localStorage.getItem('userInfo');
        const token = localStorage.getItem('token');
        
        // Verificar si existe userInfo y es válido
        if (userInfo && userInfo !== 'null' && userInfo !== 'undefined') {
            const user = JSON.parse(userInfo);
            // Verificar que el objeto usuario tenga propiedades esenciales
            // Aceptar name, username, firstName o al menos email
            const hasName = user.name || user.username || user.firstName || user.email;
            return user && user.email && hasName && token;
        }
        return false;
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
};

export const getUserInfo = () => {
    try {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo && userInfo !== 'null' && userInfo !== 'undefined') {
            return JSON.parse(userInfo);
        }
        return null;
    } catch (error) {
        console.error('Error getting user info:', error);
        return null;
    }
};

export const clearAuthData = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
};

export const setAuthData = (user, token) => {
    localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage.setItem('token', token);
};