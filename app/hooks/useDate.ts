import moment from "moment/moment";

const useDate = () => {
    const today = moment().format('YYYY-MM-DDTHH:mm:ssZ');
    return today;
}
export default useDate;