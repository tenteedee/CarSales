import {TableFilter} from "../../../../_metronic/partials/table/filter/TableFilter";
import {newsFilters} from "./table/filters/NewsFilter";
import {KTCard} from "../../../../_metronic/helpers";
import {Table} from "../../../../_metronic/partials/table/Table";
import {newsColumns} from "./table/columns/columns";

export const NewsList = () => {
    return (
        <>
            <TableFilter filters={newsFilters}/>
            <KTCard>
                <Table columns={newsColumns}/>
            </KTCard>
        </>
    )
}