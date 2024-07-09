import gql from "graphql-tag";

const Major = {
    insert: gql`
        mutation insertMajor($object: major_insert_input!) {
            staff: insert_major_one(object: $object) {
                major_id
            }
        }
    `,
    update: gql`
        mutation UpdateMajorMutation($id: uuid!, $object: major_set_input!) {
            update_major_by_pk(pk_columns: {major_id: $id}, _set: $object) {
                major_id
            }
    }
    `,
    delete: gql`
    mutation deleteMajor ($id: uuid!){
        delete_major_by_pk(major_id: $id) {
            major_id
        }
    }
    `,
    getAll: gql`
      query major($offset: Int, $limit: Int) {
        major(offset: $offset, limit: $limit) {
            major_id
            major_name
        }
    }
    `
    ,
    getOne: gql`
        query major($id: uuid!) {
            major_by_pk(major_id: $id) {
                major_id
                major_name
            }
        }
    `,
    countAll: gql`
        {
            major_aggregate {
                aggregate {
                count(columns: major_id)
                }
            }
        }
    `,
    search: gql`
        query search ($strText: String!, $phone: Int!) {
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

export default Major;