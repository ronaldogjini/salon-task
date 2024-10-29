const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;
    
    const [year, month] = dateString.split("-").map(Number);
    return month >= 1 && month <= 12;
  };

  module.exports = {isValidDate}