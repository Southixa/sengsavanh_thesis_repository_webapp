const User = {
  firstname: {
    required: true,
    message: "ກະລຸນາໃສ່ຊື່",
    trigger: ["blur"],
  },
  lastname: {
    required: true,
    message: "ກະລຸນາໃສ່ນາມສະກຸນ",
    trigger: ["blur"],
  },
  phone: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error("ກະລຸນາໃສ່ເບີໂທ");
      } else if (!/^\d*$/.test(value)) {
        return new Error("ເບີໂທຄວນເປັນຕົວເລກເທົ່ານັ້ນ");
      }
      return true;
    },
    trigger: ["blur"],
  },
  email: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error("ກະລຸນາໃສ່ອີເມລ");
      } else if (!/@gmail.com/i.test(value)) {
        return new Error("ກະລຸນາໃສ່ @gmail.com");
      }
      return true;
    },
    trigger: ["blur"],
  },
  password: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error("ກະລຸນາໃສ່ລະຫັດຜ່ານ");
      } else if (value.length <= 4) {
        return new Error("ລະຫັດຜ່ານຕ້ອງຫຼາຍກວ່າ 4 ຕົວອັກສອນ");
      }
      return true;
    },
    trigger: ["blur"],
  },
  confirmPassword: {
    required: true,
    validator(rule, value, callback, source) {
      if (!value) {
        return new Error("ກະລຸນາໃສ່ລະຫັດຜ່ານ");
      } else if (value.length <= 4) {
        return new Error("ລະຫັດຜ່ານຕ້ອງຫຼາຍກວ່າ 4 ຕົວອັກສອນ");
      }
      return true;
    },
    trigger: ["blur"],
  },
};

export default User;
