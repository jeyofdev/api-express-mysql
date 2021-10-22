export const makeError = (res, status, errorMessage) => {
    const json = { error: errorMessage };
    res.status(status).json(json);
};
export const ok = 'ok';
