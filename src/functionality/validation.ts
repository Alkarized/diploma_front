export function validateForm(formData : any){
    let validationErrors = new Map<string, string>();

    if (!formData.username) {
        validationErrors.set('username', 'Username is required');
    } else if (!/^[A-Za-z0-9]+$/.test(formData.username)){
        validationErrors.set('username', 'Username should use only letters and nums');
    } else if (!/^[A-Za-z0-9]{5,255}$/.test(formData.username)){
        validationErrors.set('username', 'Username length should be 5 to 255 characters');
    }

    if ('firstname' in formData){
        if (!formData.firstname) {
            validationErrors.set('firstname', 'First name is required');
        } else if (!/^[A-Za-z]+$/.test(formData.firstname)){
            validationErrors.set('firstname', 'Firstname should use only letters');
        } else if (!/^[A-Za-z]{5,255}$/.test(formData.firstname)){
            validationErrors.set('firstname', 'Firstname length should be 5 to 255 characters');
        }
    }

    if ('email' in formData){
        if (!formData.email) {
            validationErrors.set('email', 'Email is required');
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            validationErrors.set('email', 'Email is invalid');
        }
    }

    if (!formData.password) {
        validationErrors.set('password', 'Password is required');
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,255}$/.test(formData.password)) {
        validationErrors.set('password', 'Password must contain at least 5 characters (max 255), including uppercase, lowercase letters, and numbers');
    }

    return validationErrors;
}