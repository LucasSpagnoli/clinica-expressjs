export const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next); // envia o erro direto para o errorMiddleware
    };
};