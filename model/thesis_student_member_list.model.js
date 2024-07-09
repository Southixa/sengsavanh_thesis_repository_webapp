import gql from "graphql-tag";

const Thesis_student_member_list = {
    insert: gql`
        mutation insertThesisStudentMemberList($object: thesis_student_member_list_insert_input!) {
            thesis_student_member_list: insert_thesis_student_member_list_one(object: $object) {
                tsml_id
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
    mutation deleteThesisStudentMemberList ($id: uuid!){
        delete_thesis_student_member_list_by_pk(tsml_id: $id) {
            tsml_id
        }
    }
    `,
    getAll: gql`
      query student($offset: Int, $limit: Int) {
        student(offset: $offset, limit: $limit) {
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

export default Thesis_student_member_list;