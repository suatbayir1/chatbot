import moment from "moment";
import Swal from "sweetalert2";

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

export const toast = Swal.mixin({
  toast: true,
  icon: "success",
  title: "General Title",
  position: "top-right",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});
