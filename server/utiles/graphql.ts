export const paramsToRequest = (parent, params, { req }) => {
    req.body = { ...req.body, ...params };
};