export const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`${status} error: : ${message}`);

    return res.status(status).json({ error: message });
};