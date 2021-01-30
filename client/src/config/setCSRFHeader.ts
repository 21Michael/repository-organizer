import cookieExtraktor from '../utiles/cookieExtractor';

export default () => {
    const csrfToken: string = document.cookie && cookieExtraktor(document.cookie)['XSRF-TOKEN-CRYPTED'];
    if (csrfToken) {
        return { headers: { 'XSRF-TOKEN-CRYPTED': csrfToken } };
    }
};