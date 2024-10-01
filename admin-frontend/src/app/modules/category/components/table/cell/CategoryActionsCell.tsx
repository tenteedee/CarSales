import React, {FC, useEffect} from "react";
import {ID, KTIcon} from "../../../../../../_metronic/helpers";

import {MenuComponent} from "../../../../../../_metronic/assets/ts/components";
import {Link} from "react-router-dom";
import {Confirm} from "notiflix";
import {useQueryResponse} from "../../../../../../_metronic/layout/core/QueryResponseProvider";
import {useListView} from "../../../../../../_metronic/layout/core/ListViewProvider";
import {handleDelete} from "../../../Category";

type Props = {
    id: ID;
    value?: string; // Assuming "value" may be passed in
};

const CategoryActionsCell: FC<Props> = ({id, value, ...props}) => {
    useEffect(() => {
        MenuComponent.reinitialization()
    }, [])
    const {refetch} = useQueryResponse()
    const {clearSelected} = useListView()
    const onDeleteClick = () => {
        Confirm.show('Xác nhận', 'Bạn có chắc muốn xóa bản ghi này không?', 'Yes', 'No', () => {
            handleDelete([id]).finally(() => {
                refetch()
                clearSelected()
            })

        })
    }
    return (
        <>
            <a
                href='#'
                className='btn btn-light btn-active-light-primary btn-sm'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
            >
                Actions
                <KTIcon iconName='down' className='fs-5 m-0'/>
            </a>
            {/* begin::Menu */}
            <div
                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
                data-kt-menu='true'
            >
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                    <Link className='menu-link px-3' to={`/categories/edit/${id}`}>
                        Edit
                    </Link>
                </div>
                {/* end::Menu item */}

                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                    <a
                        className='menu-link px-3'
                        data-kt-users-table-filter='delete_row'
                        onClick={onDeleteClick}
                    >
                        Delete
                    </a>
                </div>
                {/* end::Menu item */}

            </div>
            {/* end::Menu */}
        </>
    );
};

export {CategoryActionsCell};
