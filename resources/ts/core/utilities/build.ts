export function vite_asset(path: string) {
    let pathBeginsWithSlash = path.charAt(0) == '/'
    let prod = import.meta.env.PROD
    let viteUrl = import.meta.env.VITE_DEV_SERVER_URL
    let resultPath = pathBeginsWithSlash ? path : `/${path}`
    return prod ? resultPath : `${viteUrl}${resultPath}`
}