import { NhostClient } from "@nhost/vue";


export const useNhost = () => {
    const runtimeConfig = useRuntimeConfig();
    const nhost = new NhostClient({
        subdomain: runtimeConfig.public.NHOST_SUBDOMAIN,
        region: runtimeConfig.public.NHOST_REGION,
    });
    return { nhost };
}