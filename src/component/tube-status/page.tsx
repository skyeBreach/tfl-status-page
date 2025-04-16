import { FetchDistruptionCategories, FetchLines, FetchSeverityCodes } from '@/src/services/line';
import TubeStatusTable from "@/src/component/tube-status/data-table";
import { columns } from '@/src/component/tube-status/data';
import { TDistruptionCategory, TLine, TSeverityCode } from '@/src/types/line';

const Home = async () => {
    const lines = await FetchLines();
    const severityCodes = await FetchSeverityCodes();
    const distruptionCategories = await FetchDistruptionCategories();

    console.log(severityCodes)

    return (
        <div>
            <h1>Transport for London: Tube Line Status</h1>
            <hr />
            <div className="container mx-auto py-10">
                <TubeStatusTable columns={columns} data={lines} />
            </div>

        </div>
    );
};

export default Home;
