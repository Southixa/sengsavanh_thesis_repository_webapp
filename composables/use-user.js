import { useMessage } from "naive-ui";
import Models from "~/model";
import { encryptData } from "~/utils/helpers";

export const useUser = () => {
    const { nhost } = useNhost();
    const message = useMessage();
    const { getOneStorage } = useStorage()

    const login = async (email, password) => {
        const { data, error } = await nhost.graphql.request(
            Models.User.getOneByEmailAndPassword,
            {
                email: email,
                password: password
            }
        )
        if(error) {
            message.error("ເຂົ້າສຸ່ລະບົບບໍ່ສຳເລັດ");
            // console.log("error occurred in login =>", error);
            return false
        }
        if(data.user_tb.length == 0) {
            message.error("ອີເມວ ແລະ ລະຫັດຜ່ານ ບໍ່ຖືກຕ້ອງ");
            return false
        }
        if(data.user_tb[0].user_is_approved == false) {
            navigateTo("/pending-approval");
            return false
        }
        let user = data.user_tb[0];
        user = {
            ...user,
            user_image_url: getOneStorage(user.user_avatar.user_avatar, 200)
        }
        // console.log(user);
        const userInfoAsJson = JSON.stringify(user);
        const userInfoEncypt = encryptData(userInfoAsJson);
        localStorage.setItem("user", userInfoEncypt);
        return data.user_tb[0];
    }

    const addUser = async (userData) => {
        const { data, error } = await nhost.graphql.request(
            Models.User.insert,
            {
                object: {
                    user_avatar_id: userData.userAvatar.user_avatar_id,
                    user_firstname: userData.firstname,
                    user_lastname: userData.lastname,
                    user_phone: userData.phone,
                    user_email: userData.email,
                    user_password: userData.password,
                    user_is_approved: (userData.isApproved == "true"),
                }
            }
        );
        if(error) {
            message.error("ລົງທະບຽນບໍ່ສຳເລັດ");
            // console.log("error occurred in addUser =>", error);
            return false
        }
        localStorage.setItem("user_id", data.insert_user_tb_one.user_id);
        return data.insert_user_tb_one;
    }

    const getOneByEmail = async (email) => {
        const { data, error } = await nhost.graphql.request(
            Models.User.getOneByEmail,
            {
                email: email
            }
        );
        if(error) {
            message.error("ກະລຸນາເຂົ້າສູ່ລະບົບ");
            // console.log("error occurred in getOneByEmail =>", error);
            return false
        }
        return data.user_tb
    }

    return {
        addUser,
        getOneByEmail,
        login
    }

}