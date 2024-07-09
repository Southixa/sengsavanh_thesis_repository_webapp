import gql from "graphql-tag";

const User_avatar = {
    insert: gql`
        mutation insertStudent($object: student_insert_input!) {
            staff: insert_student_one(object: $object) {
                student_id
            }
        }
    `,
    update: gql`
        mutation UpdateStudentMutation($id: uuid!, $object: student_set_input!) {
            update_student_by_pk(pk_columns: {student_id: $id}, _set: $object) {
                student_id
            }
    }
    `,
    delete: gql`
    mutation deleteStudent ($id: uuid!){
        delete_student_by_pk(student_id: $id) {
            student_id
        }
    }
    `,
    getAll: gql`
      query user_avatar($offset: Int, $limit: Int) {
        user_avatar(offset: $offset, limit: $limit) {
            user_avatar_id
            user_avatar_order
            user_avatar
        }
    }
    `
    ,
    getOne: gql`
        query student($id: uuid!) {
            student_by_pk(student_id: $id) {
                student_id
                student_profile
                student_firstname
                student_lastname
                student_gender
                student_phone
                student_email
                major_id
                degree_type_id
            }
        }
    `,
    countAll: gql`
        {
            student_aggregate {
                aggregate {
                count(columns: student_id)
                }
            }
        }
    `,
    search: gql`
        query search ($strText: String!, $phone: Int!) {
        student(where:
            {
            _or: [
                {student_lastname: {_ilike: $strText}},
                {student_firstname: {_ilike: $strText}},
                {student_email: {_ilike: $strText}},
                {student_phone: {_eq: $phone}},
            ]
            }
        ) {
            student_id
            student_profile
            student_firstname
            student_lastname
            student_gender
            student_phone
            student_email
            major_id
            degree_type_id
        }
    }
    `,
}

export default User_avatar;