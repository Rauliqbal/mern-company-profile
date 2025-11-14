export const formatDate = (date: Date | string): string => {
  const locale = "id-ID";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (!date) {
    return "";
  }

  const dateObject = new Date(date);

  if (isNaN(dateObject.getTime())) {
    console.log("Invalid date value: ", date);
    return "";
  }

  return dateObject.toLocaleDateString(locale, options);
};
