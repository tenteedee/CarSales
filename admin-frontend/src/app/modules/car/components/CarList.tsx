import {TableFilter} from '../../../../_metronic/partials/table/filter/TableFilter'
import {carFilters} from './table/filter/CarFilter'
import {KTCard} from '../../../../_metronic/helpers'
import {Table} from '../../../../_metronic/partials/table/Table'
import {carsColumns} from './table/column/columns'

export const CarList = () => {
    return (
        <>
            <TableFilter filters={carFilters} />
            <KTCard>
                <Table columns={carsColumns} />
            </KTCard>
        </>
    )
}
