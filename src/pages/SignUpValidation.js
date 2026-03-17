function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Match backend requirement: minimum 6 characters (allow any characters)
    const password_pattern = /^.{6,}$/;

    if (!values.name) {
        error.name = "Name should not be empty";
    }

    if (!values.email) {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Invalid email format";
    }

    if (!values.password) {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password must be at least 6 characters";
    }

    return error;
}

export default Validation;
