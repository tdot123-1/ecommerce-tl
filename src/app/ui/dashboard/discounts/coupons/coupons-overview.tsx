import { fetchAllCouponsAndCodes } from "@/lib/data/discounts/dashboard/data";

const CouponsOverview = async () => {

    const couponData = await fetchAllCouponsAndCodes()

    return ( <></> );
}
 
export default CouponsOverview;