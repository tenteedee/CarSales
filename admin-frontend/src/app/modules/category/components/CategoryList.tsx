import {TableFilter} from "../../../../_metronic/partials/table/filter/TableFilter";
import {KTCard} from "../../../../_metronic/helpers";
import {Table} from "../../../../_metronic/partials/table/Table";
import {categoryFilter} from "./table/filters/CategoryFilter";
import {categoryColumns} from "./table/columns/columns";

export const CategoryList = () => {
    return (
        <>
            <TableFilter filters={categoryFilter}/>
            <KTCard>
                <Table columns={categoryColumns}/>
            </KTCard>
        </>
    )
}