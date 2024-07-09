import { useMessage } from "naive-ui";
import Models from "~/model";

export const useStorage = () => {
    const { nhost } = useNhost();
    const message = useMessage();

    const getOneStorage = (id, size = null) => {
        const imageUrl = nhost.storage.getPublicUrl({
            fileId: id,
            height: size,
            width: size
        })
        if(!imageUrl) {
            message.error("ໂຫຼດຮູບບໍ່ສຳເລັດ");
            // console.log("error occurred in getOneStorage =>", error);
            return false
        }
        return imageUrl;
    }

    return {
        getOneStorage
    }

}