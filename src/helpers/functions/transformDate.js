const transformDate = (date) => {
  if (date.includes("-")) {
    const day = date.split("-")[2];
    const month = date.split("-")[1];
    const year = date.split("-")[0];

    return `${day}/${month}/${year}`;
  }

  return date;
};

export default transformDate;
