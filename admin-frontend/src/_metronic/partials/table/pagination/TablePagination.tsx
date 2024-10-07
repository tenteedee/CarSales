import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from "../../../layout/core/QueryResponseProvider";
import {useQueryRequest} from "../../../layout/core/QueryRequestProvider";

const mappedLabel = (label: string): string => {
    if (label === 'pagination.previous') {
        return 'Previous'
    }

    if (label === 'pagination.next') {
        return 'Next'
    }

    return label
}

const TablePagination = () => {
    const pagination = useQueryResponsePagination()
    const isLoading = useQueryResponseLoading()
    const {updateState} = useQueryRequest()
    const updatePage = (page: number | null) => {
        if (!page || isLoading || pagination.page === page) {
            return
        }
        updateState({page, items_per_page: pagination.items_per_page || 10})
    }
    const updateItemPerPage = (itemPerPage: number | null) => {
        if (!itemPerPage || isLoading || pagination.items_per_page === itemPerPage) {
            return
        }
        updateState({items_per_page: itemPerPage || 10})
    }

    return (
        <div className='row'>
            <div
                className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'>
                <div className="dataTables_info">Đang
                    xem {pagination?.from?.toLocaleString()} đến {pagination?.to?.toLocaleString()} trong tổng
                    số {pagination?.total?.toLocaleString()} mục
                </div>
            </div>
            <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                <div className="dataTables_length" id="kt_customers_table_length">
                    <label>
                        <select
                            name="kt_customers_table_length"
                            className="form-select form-select-sm form-select-solid"
                            onChange={(e) => updateItemPerPage(Number(e.target.value))}
                            defaultValue={pagination.items_per_page || 10}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </select>
                    </label>
                </div>

                <div id='kt_table_users_paginate'>
                    <ul className='pagination'>
                        {pagination.links
                            ?.map((link) => {
                                return {...link, label: mappedLabel(link.label)}
                            })
                            .map((link) => (
                                <li
                                    key={link.label}
                                    className={clsx('page-item', {
                                        active: link.active,
                                        disabled: isLoading,
                                        previous: link.label === 'Previous',
                                        next: link.label === 'Next',
                                    })}
                                >
                                    <a
                                        className={clsx('page-link', {
                                            'page-text': link.label === 'Previous' || link.label === 'Next',
                                            'me-5': link.label === 'Previous',
                                        })}
                                        onClick={() => updatePage(link.page)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        {mappedLabel(link.label)}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export {TablePagination}
