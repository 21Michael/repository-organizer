export default (cookie: String) => {
    const cookieMass: string[][] = cookie.split(';').map((el) => el.trim().split('='));
    return Object.fromEntries(cookieMass);
}