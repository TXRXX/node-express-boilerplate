const makeResponse = (data) => {
    return {
        ...data,
        id: data._id,
    };
};

module.exports = { makeResponse };
