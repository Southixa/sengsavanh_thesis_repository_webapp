import { useMessage } from "naive-ui";
import Models from "~/model";
import { encryptData } from "~/utils/helpers";

export const useMajor = () => {
    const { nhost } = useNhost();
    const message = useMessage();
    const { getOneStorage } = useStorage()

    const getAllMajor = async () => {
        const { data, error } = await nhost.graphql.request(
            Models.Major.getAll,
            {
                offset: 0,
                limit: 100
            }
        );
        if(error) {
            message.error("ບໍ່ສາມາດດຶງຂໍ້ມູນສາຂາໄດ້");
            // console.log("error occurred in getAllMajor =>", error);
            return false
        }
        return data.major
    }

    return {
        getAllMajor
    }

}