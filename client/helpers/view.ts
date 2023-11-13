import moment from "moment";

export const subStringWithContinue = (sentence: string, length: number) => {
  return sentence.length > length
    ? `${sentence.substring(0, length)}...`
    : sentence;
};

export const toDateString = (dateString: Date) => {
  if (!dateString) {
    return "N/A";
  }

  return moment(dateString).format("MMM DD, YYYY H:mm");
};
