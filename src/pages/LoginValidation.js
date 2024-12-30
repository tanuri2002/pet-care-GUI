function validation(values) {
    let error = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    // Email Validation
    if (!values.email) {
        error.email = "Name should not be empty";
    } else if (!emailPattern.test(values.email)) {
        error.email = "Email is not valid";
    }

    // Password Validation
    if (!values.password) {
        error.password = "Password shouldn't be empty";
    } else if (!passwordPattern.test(values.password)) {
        error.password = "Password must contain at least 8 characters, including uppercase, lowercase, and a number";
    }

    return error;
}

export default validation;
