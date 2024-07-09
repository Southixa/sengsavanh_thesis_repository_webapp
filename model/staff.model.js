import gql from "graphql-tag";

const Staff = {
    insert: gql`
        mutation insertStuff($object: staff_insert_input!) {
            staff: insert_staff_one(object: $object) {
                staff_id
            }
        }
    `,
    update: gql`
        mutation UpdateStaffMutation($id: uuid!, $object: staff_set_input!) {
            update_staff_by_pk(pk_columns: {staff_id: $id}, _set: $object) {
                staff_id
            }
    }
    `,
    delete: gql`
    mutation deleteStaff ($id: uuid!){
        delete_staff_by_pk(staff_id: $id) {
            staff_id
        }
    }
    `,
    getAll: gql`
      query stuff($offset: Int, $limit: Int) {
        staff(offset: $offset, limit: $limit) {
            staff_id
            staff_firstname
            staff_lastname
            staff_email
            staff_phone
            staff_password
            staff_profile
            staff_role
            users_id
        }
    }
    `
    ,
    getOne: gql`
        query staff($id: uuid!) {
            staff_by_pk(staff_id: $id) {
                staff_id
                staff_firstname
                staff_lastname
                staff_email
                staff_phone
                staff_password
                staff_profile
                staff_role
                users_id
            }
        }
    `,
    countAll: gql`
         {
            staff_aggregate {
                aggregate {
                count(columns: staff_id)
                }
            }
        }
    `,
    search: gql`
        query search ($strText: String!, $phone: bigint!) {
        staff(where:
            {
            _or: [
                {staff_lastname: {_ilike: $strText}},
                {staff_firstname: {_ilike: $strText}},
                {staff_email: {_ilike: $strText}},
                {staff_phone: {_eq: $phone}},
            ]
            }
        ) {
            staff_id
            staff_firstname
            staff_lastname
            staff_email
            staff_password
            staff_phone
            staff_profile
            staff_role
        }
    }
    `
}

export default Staff;