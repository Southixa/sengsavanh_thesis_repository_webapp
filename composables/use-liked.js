import { useMessage } from "naive-ui";
import Models from "~/model";
import { encryptData } from "~/utils/helpers";

export const useLiked = () => {
    const { nhost } = useNhost();
    const message = useMessage();
    const { getOneStorage } = useStorage()

    const addLiked = async (userId, thesisId) => {
        const { data, error } = await nhost.graphql.request(
            Models.Liked.insert,
            {
                object: {
                    user_id: userId,
                    thesis_id: thesisId
                }
            }
        );
        if(error) {
            message.error("ບໍ່ສາມາດເພີ່ມຂໍ້ມູນຖືກໃຈໄດ້");
            // console.log("error occurred in addLiked =>", error);
            return false
        }
        return data
    }

    const getAllByUserId = async (userId) => {
        const { data, error } = await nhost.graphql.request(
            Models.Liked.getAllByUserId,
            {
                user_id: userId
            }
        );
        if(error) {
            message.error("ບໍ່ສາມາດດຶງຂໍ້ມູນຖືກໃຈໄດ້");
            // console.log("error occurred in getAllByUserId =>", error);
            return false
        }
        return data.liked
    }

    const getAllByUserIdAndThesisId = async (userId, thesisId) => {
        const { data, error } = await nhost.graphql.request(
            Models.Liked.getAllByUserIdAndThesisId,
            {
                user_id: userId,
                thesis_id: thesisId
            }
        );
        if(error) {
            message.error("ບໍ່ສາມາດດຶງຂໍ້ມູນຖືກໃຈໄດ້");
            // console.log("error occurred in getAllByUserIdAndThesisId =>", error);
            return false
        }
        return data.liked
    }

    const deleteByuserIdAndThesisId = async (userId, thesisId) => {
        const { data, error } = await nhost.graphql.request(
            Models.Liked.deleteByuserIdAndThesisId,
            {
                user_id: userId,
                thesis_id: thesisId
            }
        );
        if(error) {
            message.error("ບໍ່ສາມາດລົບຂໍ້ມູນຖືກໃຈໄດ້");
            // console.log("error occurred in deleteByuserIdAndThesisId =>", error);
            return false
        }
        return data
    }

    return {
        getAllByUserId,
        getAllByUserIdAndThesisId,
        deleteByuserIdAndThesisId,
        addLiked
    }

}