export const countRate = (ratings:any) =>{
  if (ratings.length === 0) {
	return 0;
  }
  const totalRating = ratings.reduce((total:any, rating:any) => total + rating, 0);
  const averageRating = totalRating / ratings.length;
  const result = averageRating.toFixed(1);

  return parseFloat(result);
}

export const convertRating = (rateVal:any) =>{
  let starVal;
  if (rateVal < Math.floor(rateVal) + 0.5) {
	starVal = Math.floor(rateVal) + 0.0;
  } else if (rateVal <= Math.floor(rateVal) + 0.9) {
	starVal = Math.floor(rateVal) + 0.5;
  }

  return starVal;
}
