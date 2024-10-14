import {useFormik} from 'formik'
import {Confirm} from 'notiflix'
import {FC, useEffect} from 'react'
import {Filters} from "../../../../app/utils/model/models";
import {useQueryRequest} from "../../../layout/core/QueryRequestProvider";
import {useQueryResponse} from "../../../layout/core/QueryResponseProvider";
import {initialQueryState, KTCard, KTCardBody, useDebounce} from '../../../helpers';
import SelectField from '../../form/select/SelectField';
import {useListView} from "../../../layout/core/ListViewProvider";

type Props = {
    filters: Array<Filters>
}

const TableFilter: FC<Props> = ({filters}) => {
    const {updateState} = useQueryRequest()
    const {refetch} = useQueryResponse()
    const {selected, onDelete, clearSelected} = useListView()

    const initialValues = (filters: Array<Filters>): any => {
        let object: object = {}
        filters.map((filter) => Object.assign(object, {[filter.name]: ''}))
        return object
    }

    const formik = useFormik({
        initialValues: initialValues(filters),
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            console.log(values)
        },
    })

    const debouncedSearchTerm = useDebounce(JSON.stringify(formik.values), 200)

    useEffect(() => {
        if (debouncedSearchTerm !== undefined) {
            const search = JSON.parse(debouncedSearchTerm)
            const searchTerm: any[] = []
            Object.entries(search).forEach((item: any) => {
                if (item[1] !== '') {
                    if (Array.isArray(item[1])) {
                        const values = item[1].map((obj: any) => obj.value);
                        searchTerm.push(`${item[0]}=${values.join(',')}`);
                    } else {
                        searchTerm.push(`${item[0]}=${item[1]}`);
                    }
                }
            });

            updateState({search: searchTerm.join('|'), ...initialQueryState})
        }
    }, [debouncedSearchTerm])

    const onDeleteClick = () => {
        Confirm.show('Xác nhận', 'Bạn có chắc muốn xóa các bản ghi này không?', 'Yes', 'No', () => {
            if (onDelete) {
                onDelete()?.finally(() => {
                    refetch()
                    clearSelected()
                })
            }
        })
    }

    if (filters.length === 0) return <></>
    return (
        <KTCard className='mb-4'>
            <KTCardBody className='pt-3'>
                <form id='item-edit' onSubmit={formik.handleSubmit}>
                    <div className='row'>
                        {filters.map((filter, index) => (
                            <div className='col-lg-2 col-sm-12' key={index}>

                                {filter.type === undefined || filter.type === 'text' ? (
                                    <>
                                        <label className='col-form-label'>{filter.label}</label>
                                        <div style={{marginTop: '-0.5rem'}}>
                                            <input
                                                placeholder={filter.label}
                                                {...formik.getFieldProps(filter.name)}
                                                className='form-control form-control-solid'
                                            />
                                        </div>
                                    </>
                                ) : (filter.type === 'items' ? (
                                        <>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <label className='col-form-label'>{filter.label}</label>
                                            <div style={{marginTop: '-0.5rem'}}>
                                                <SelectField
                                                    options={filter.options}
                                                    // defaultValue={{
                                                    //     value: -1,
                                                    //     label: `Chọn ${filter.label.toLowerCase()}`,
                                                    // }}
                                                    onChange={(newValue: any) => {
                                                        formik.setFieldValue(filter.name, newValue)
                                                        }
                                                    }
                                                ></SelectField>
                                            </div>
                                        </>
                                    ))}
                            </div>
                        ))}
                        <div
                            className='col-md-1 col-sm-12'
                            style={{display: selected.length > 0 ? '' : 'none'}}
                        >
                            <label className='col-form-label'></label>
                            <div className='mt-3'>
                                <button type='button' className='btn btn-sm btn-danger' onClick={onDeleteClick}>
                                    <i className='bi bi-trash'></i>
                                    <span className='ms-1'>Xóa {selected.length} bản ghi</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                {/* end::Card toolbar */}
            </KTCardBody>
        </KTCard>
    )
}

export {TableFilter}
