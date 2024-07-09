import { useMessage } from "naive-ui";
import Models from "~/model";

export const useUserAvatar = () => {
    const { nhost } = useNhost();
    const message = useMessage();

    const getUserAvatarAll = async () => {
        const { data, error } = await nhost.graphql.request(
            Models.User_avatar.getAll,
            {
                offset: 0,
                limit: 100
            }
        );
        if(error) {
            message.error("ໂຫຼດຂໍ້ມູນຮູບຜູ້ໃຊ້ບໍ່ສຳເລັດ");
            // console.log("error occurred in getUserAvatarAll =>", error);
            return false
        }
        return data.user_avatar
    }

    return {
        getUserAvatarAll
    }

}