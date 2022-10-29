import { useMemo, useCallback, useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslations } from "../App/useTranslations";
import { gql } from "@apollo/client";
import { useSelector } from "react-redux";
import getApolloClient from "../../apollo/apolloClient";
import getImageUrl from 'Helper/getImageUrl';

export const useCareer = (props) => {
    const { __ } = useTranslations();
    const state = useSelector(state => state);
    const { accountId } = useSelector(state => state.shop);
    const apolloClient = getApolloClient(state);
    const [jobs, setJobs] = useState([])
    const [message, setMessage] = useState({})
    const [cvPath, setCvPath] = useState("")

    useEffect(() => {
        if (message?.type) {
            setTimeout(() => {
                setMessage({})
            }, 3000)
        }
    }, [message])

    const ApplicantSchema = useMemo(() => Yup.object().shape({
        name: Yup.string()
            .min(2, __('to.short'))
            .max(50, __('to.long'))
            .required(__('form.field.required.error.message')),
        email: Yup.string().email("Մուտքագրեք ճիշտ էլ հասցե")
            .required(__('form.field.required.error.message')),
        phone: Yup.number()
            .required(__('form.field.required.error.message')),
        selectedWorks: Yup.array().min(1, __('form.field.required.error.message')),
        letter: Yup.string()
            .required(__('form.field.required.error.message')),
        file: Yup.string()
            .required(__('form.field.required.error.message')),
    }), []);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            selectedWorks: [],
            letter: "",
            file: "",
        },
        validationSchema: ApplicantSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const ADD_APPLICANT_TO_JOBS = gql`
                    mutation addApplicantToJobs($applicantData: ApplicantData!,$jobIds: [String!]) {
                        addApplicantToJobs (applicantData: $applicantData,jobIds: $jobIds)
                    }
                `;
                const { data } = await apolloClient.mutate({
                    mutation: ADD_APPLICANT_TO_JOBS,
                    variables: {
                        applicantData: {
                            name: values.name,
                            email: values.email,
                            phone: "" + values.phone,
                            file: values.file,
                            letter: values.letter,
                        },
                        jobIds: values.selectedWorks
                    }
                });
                setMessage({
                    type: 'success',
                    text: 'Դիմումը հաջողությամբ ուղարկվեց'
                });
                resetForm()
            } catch (error) {
                setMessage({
                    type: "error",
                    text: error.message
                })
                return error
            }
        }
    })


    const fetJobsData = useCallback(async () => {
        const GET_JOBS = gql`
            query jobs {
                jobs{
                    items{
                        id
                        name
                        content {
                            scope
                            value
                        }
                        image
                    }
                    total
                    totalPages
                }
            }
        `;
        const { data } = await apolloClient.query({
            query: GET_JOBS,
            variables: {},
            fetchPolicy: "no-cache"
        });
        const { jobs } = data
        setJobs(jobs?.items)
    }, [])

    useEffect(() => {
        fetJobsData()
    }, [])

    const removeByIndex = (arr = [], indexes = []) => {
        for (let i = 0; i < indexes.length; ++i) {
            const index = Number(indexes[i]) - i;
            if (index < 0) return arr;

            const startElements = arr.slice(0, index);
            const endElements = arr.slice(index + 1, arr.length);
            arr = startElements.concat(endElements);
        }
        return arr;
    };

    const handleApplicationInWork = (item) => {
        if (formik && formik?.values && formik.values?.selectedWorks.includes(item.name)) {
            let checksWork = formik.values.selectedWorks
            const checkIndex = checksWork.indexOf(item.name)
            const newChecksWork = removeByIndex(checksWork, [checkIndex])
            formik.setFieldValue("selectedWorks", newChecksWork)
        } else {
            formik.setFieldValue("selectedWorks", [...formik.values.selectedWorks, item.id])
        }
    }

    const handleUploadFile = async (event) => {
        const file = Object.assign(event.currentTarget.files[0], {
            preview: URL.createObjectURL(event.currentTarget.files[0]),
            uploading: true,
            roles: []
        });

        const UPLOAD_FILE = gql`
            mutation uploadCareerFile($file: Upload!){
                uploadCareerFile(file:$file){
                    path
                }
            }
        `;

        const { data } = await apolloClient.mutate({
            mutation: UPLOAD_FILE,
            variables: {
                file: file,
            }

        });
        const { uploadCareerFile } = data;
        const path = getImageUrl({ src: uploadCareerFile.path, accountId })
        setCvPath(path)
        formik.setFieldValue("file", uploadCareerFile.path);
    }

    return {
        formik,
        __,
        handleApplicationInWork,
        handleUploadFile,
        cvPath,
        accountId,
        message,
        jobs,
    }
}