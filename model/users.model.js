import gql from "graphql-tag";

const Users = {
    insert: gql`
        mutation insertUser($object: user_tb_insert_input!) {
            insert_user_tb_one(object: $object) {
                user_id
            }
        }
    `,
    update: gql`
        mutation UpdateUserMutation($id: uuid!, $object: user_tb_set_input!) {
            update_user_tb_by_pk(pk_columns: {user_id: $id}, _set: $object) {
                user_id
            }
    }
    `,
    updateAllToApproved: gql`
    mutation MyMutation {
        update_user_tb_many(updates: {where: {user_is_approved: {_eq: false}}, _set: {user_is_approved: true}}) {
            returning {
            user_id
            }
            affected_rows
        }
    }
    `,
    delete: gql`
    mutation deleteUsers($id: uuid!) {
        deleteUser(id: $id) {
            id
        }
    }
    `,
    getAll: gql`
        query user_tb($offset: Int, $limit: Int, $order_by: order_by) {
        user_tb(offset: $offset, limit: $limit, order_by: {user_is_approved: $order_by}) {
            user_id
            user_avatar_id
            user_firstname
            user_lastname
            user_phone
            user_email
            user_password
            user_is_approved
            user_avatar {
            user_avatar_id
            user_avatar
            user_avatar_order
            }
        }
        }

    `
    ,
    getOne: gql`
        query user_tb($id: uuid!) {
            user_tb_by_pk(user_id: $id) {
                user_id
                user_avatar_id
                user_firstname
                user_lastname
                user_phone
                user_email
                user_password
                user_is_approved
            }
        }
    `,
    countAll: gql`
        {
            user_tb_aggregate {
                aggregate {
                count(columns: user_id)
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
    countUserNotApproved: gql`
        query MyQuery {
            user_tb_aggregate(where: { user_is_approved: { _eq: false } }) {
                aggregate {
                count(columns: user_id)
                }
            }
        }
    `,
}

export default Users;