const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9]{3,30}$/;
    return re.test(username);
};

const validatePassword = (password) => {
    const re = /^[a-zA-Z0-9]{8,30}$/;
    return re.test(password);
};

module.exports = { validateUsername, validatePassword };
