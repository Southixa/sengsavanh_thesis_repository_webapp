import { useMessage } from "naive-ui";
import Models from "~/model";
import { encryptData } from "~/utils/helpers";

export const useDegree = () => {
    const { nhost } = useNhost();
    const message = useMessage();

    const getAllDegree = async () => {
        const { data, error } = await nhost.graphql.request(
            Models.Degree.getAll,
            {
                offset: 0,
                limit: 100
            }
        );
        if(error) {
            message.error("ບໍ່ສາມາດດຶງຂໍ້ມູນລະດັບໄດ້");
            // console.log("error occurred in getAllDegree =>", error);
            return false
        }
        return data.degree_type
    }

    return {
        getAllDegree
    }

}