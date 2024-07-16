export const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9]{3,30}$/;
    return re.test(username);
};

export const validatePassword = (password) => {
    const re = /^[a-zA-Z0-9]{8,30}$/;
    return re.test(password);
};
