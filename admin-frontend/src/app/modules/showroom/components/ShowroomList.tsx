import {KTCard} from "../../../../_metronic/helpers";
import {Table} from "../../../../_metronic/partials/table/Table";
import {showroomColumns} from "./table/columns/columns";
import {TableFilter} from "../../../../_metronic/partials/table/filter/TableFilter";
import {showroomFilter} from "./table/filters/ShowroomFilter";

export const ShowroomList = () => {
    return (
        <>
            <TableFilter filters={showroomFilter}/>
            <KTCard>
                <Table columns={showroomColumns}/>
            </KTCard>
        </>
    )
}