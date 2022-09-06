export function vite_asset(path: string) {
    const pathBeginsWithSlash = path.charAt(0) == "/";
    const prod = import.meta.env.PROD;
    const viteUrl = import.meta.env.VITE_DEV_SERVER_URL;
    const resultPath = pathBeginsWithSlash ? path : `/${path}`;
    return prod ? resultPath : `${viteUrl}${resultPath}`;
}
