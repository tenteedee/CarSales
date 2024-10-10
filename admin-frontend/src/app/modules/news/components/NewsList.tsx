import {NewsFiltersComponent} from "./table/filters/NewsFilter";
import {KTCard} from "../../../../_metronic/helpers";
import {Table} from "../../../../_metronic/partials/table/Table";
import {newsColumns} from "./table/columns/columns";

export const NewsList = () => {
    return (
        <>
            <NewsFiltersComponent/>
            <KTCard>
                <Table columns={newsColumns}/>
            </KTCard>
        </>
    )
}