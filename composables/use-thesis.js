import { useMessage } from "naive-ui";
import Models from "~/model";
import { encryptData } from "~/utils/helpers";
import gql from "graphql-tag";

export const useThesis = () => {
    const { nhost } = useNhost();
    const message = useMessage();
    const { getOneStorage } = useStorage()

    const getAll = async () => {
        const { data, error } = await nhost.graphql.request(
            Models.Thesis.getAll
        );
        if(error) {
            message.error("ບໍ່ສາມາດດຶງຂໍ້ມູນບົດຈົບໄດ້");
            // console.log("error occurred in getAll =>", error);
            return false
        }
        return data.thesis
    }

    const getAllByFilter = async (majorFilterList, degreeFilterList, yearFilterList, searchKeyword = "", thesisType = "student") => {
        const isMajorGetAll = majorFilterList.includes("all");
        const isDegreeGetAll = degreeFilterList.includes("all");
        const isYearGetAll = yearFilterList.includes("all");

        const isThesisTypeGetAll = thesisType === "all";

        const thesisTypeOptions = {
            student: "9d7fbd22-df64-4dd3-ab7c-51bbc33641c1",
            teacher: "4d22b15b-8fa4-4e9c-b347-e8e8499487de",
            institute: "7f6bba9d-c327-40ef-a29c-9f837ad01a1f"
        }

        const { data, error } = await nhost.graphql.request(
            `
            query MyQuery {
                thesis(where: {
                    _or: [
                    { thesis_title_lao: { _ilike: "%${searchKeyword}%" } },
                    { thesis_title_eng: { _ilike: "%${searchKeyword}%" } },
                    ],
                    _and: [
                    ${isMajorGetAll ? "" : `{ major_id: { _in: [${majorFilterList.map(major => `"${major}"`)}] } }`},
                    ${isDegreeGetAll ? "" : `{ degree_type_id: { _in: [${degreeFilterList.map(degree => `"${degree}"`)}] } }`},
                    ${isYearGetAll ? "" : `{ thesis_year: { _in: [${yearFilterList.map(year => `${year}`)}] } }`},
                    ${isThesisTypeGetAll ? "" : `{ thesis_type_id: { _eq: "${thesisTypeOptions[thesisType]}" } }`},
                    ]
                }) {
                    thesis_id
                    thesis_year
                    thesis_title_lao
                    thesis_title_eng
                    degree_type_id
                    major_id
                    thesis_type {
                    thesis_type_name
                    thesis_type_id
                    }
                    major {
                    major_name
                    major_id
                    }
                    degree_type {
                    degree_type_id
                    degree_type_name
                    }
                    seen
                    liked
                    downloaded
                    created_at
                }
            }



            `
        );
        if(error) {
            message.error("ດຶງຂໍ້ມູນບົດຈົບບໍ່ສຳເລັດ");
            // console.log("error occurred in getAllByFilter =>", error);
            return false
        }
        return data.thesis
    }

    const getOneThesis = async (thesisId) => {
        const { data, error } = await nhost.graphql.request(
            Models.Thesis.getOne,
            {
                thesis_id: thesisId
            }
        );
        if(error) {
            message.error("ດຶງຂໍ້ມູນບົດຈົບບໍ່ສຳເລັດ");
            // console.log("error occurred in getOneThesis =>", error);
            return false
        }
        return data.thesis_by_pk
    }

    const updateThesisDownloadedAmountIncrement = async (thesisId) => {
        const thesis = await getOneThesis(thesisId);
        const { data, error } = await nhost.graphql.request(
            Models.Thesis.updateDownloadedAmount,
            {
                thesis_id: thesisId,
                downloaded: thesis.downloaded + 1
            }
        );
        if(error) {
            message.error("ອັບເດດຂໍ້ມູນດາວໂຫຼດບໍ່ສຳເລັດ");
            // console.log("error occurred in updateThesisDownloadedAmountIncrement =>", error);
            return false
        }
        return data;
    }

    const updateThesisSeenAmountIncrement = async (thesisId) => {
        const thesis = await getOneThesis(thesisId);
        const { data, error } = await nhost.graphql.request(
            Models.Thesis.updateSeenAmount,
            {
                thesis_id: thesisId,
                seen: thesis.seen + 1
            }
        );
        if(error) {
            message.error("ອັບເດດຂໍ້ມູນເບິ່ງບໍ່ສຳເລັດ");
            // console.log("error occurred in updateThesisSeenAmountIncrement =>", error);
            return false
        }
        return data;
    }

    const updateThesisLikedAmountIncrement = async (thesisId) => {
        const thesis = await getOneThesis(thesisId);
        const { data, error } = await nhost.graphql.request(
            Models.Thesis.updateLikedAmount,
            {
                thesis_id: thesisId,
                liked: thesis.liked + 1
            }
        );
        if(error) {
            message.error("ອັບເດດຂໍ້ມູນເບິ່ງບໍ່ສຳເລັດ");
            // console.log("error occurred in updateThesisLikedAmountIncrement =>", error);
            return false
        }
        return data;
    }

    const updateThesisLikedAmountDecrement = async (thesisId) => {
        const thesis = await getOneThesis(thesisId);
        const { data, error } = await nhost.graphql.request(
            Models.Thesis.updateLikedAmount,
            {
                thesis_id: thesisId,
                liked: thesis.liked - 1
            }
        );
        if(error) {
            message.error("ອັບເດດຂໍ້ມູນເບິ່ງບໍ່ສຳເລັດ");
            // console.log("error occurred in updateThesisLikedAmountDecrement =>", error);
            return false
        }
        return data;
    }

    return {
        getAll,
        getAllByFilter,
        getOneThesis,
        updateThesisDownloadedAmountIncrement,
        updateThesisSeenAmountIncrement,
        updateThesisLikedAmountIncrement,
        updateThesisLikedAmountDecrement
    }

}