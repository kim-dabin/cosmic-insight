// 날짜를 랜덤하게 생성하는 함수
export const getRandomDate = () => {
    // NASA APOD는 1995년 6월 16일부터 데이터 제공
    const startDate = new Date(1995, 5, 16); // 월은 0부터 시작 (6월 = 5)
    const endDate = new Date();
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    const randomDate = new Date(randomTime);
  
    // 날짜 포맷을 'YYYY-MM-DD' 형식으로 변환
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 맞춤
    const day = String(randomDate.getDate()).padStart(2, '0'); // 일을 2자리로 맞춤
    return `${year}-${month}-${day}`;
  };

//지구의 계절 계산 함수
export const getEarthSeason = async (latitude) => {
  const now = new Date();
  const month = now.getMonth() + 1; // 월 (1~12)
  const day = now.getDate(); // 일

  if ((month === 3 && day >= 21) || (month > 3 && month < 6) || (month === 6 && day <= 20)) {
      return latitude >= 0 ? 'spring' : 'fall'; // 북반구: 봄, 남반구: 가을
  } else if ((month === 6 && day >= 21) || (month > 6 && month < 9) || (month === 9 && day <= 20)) {
      return latitude >= 0 ? 'summer' : 'winter'; // 북반구: 여름, 남반구: 겨울
  } else if ((month === 9 && day >= 21) || (month > 9 && month < 12) || (month === 12 && day <= 20)) {
      return latitude >= 0 ? 'fall' : 'spring'; // 북반구: 가을, 남반구: 봄
  } else {
      return latitude >= 0 ? 'winter' : 'summer'; // 북반구: 겨울, 남반구: 여름
  }
};