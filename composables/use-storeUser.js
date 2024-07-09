import { useMessage } from "naive-ui";
import Models from "~/model";
import { encryptData } from "~/utils/helpers";

export const useStoreUser = () => {
    const { nhost } = useNhost();
    const message = useMessage();
    const { getAllByUserId } = useLiked();

    const likedThesisList = useState("likedThesisList", () => []);
    const isInit = useState("isInit", () => false);

    const getLikedThesisList = async (userId) => {
        if(isInit.value) {
            return likedThesisList.value
        }

        const result = await getAllByUserId(userId)
        likedThesisList.value = result
        isInit.value = true
        return likedThesisList.value
    }


    return {
        getLikedThesisList
    }

}