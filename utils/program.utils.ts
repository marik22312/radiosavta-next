import moment from 'moment';
  
  export const getDayOfWeek = (program: any) => {
	  if (Array.isArray(program.programTimes)) {
		  return moment().weekday(program.programTimes[0].day_of_week).toDate();
		}
		return moment().weekday(program.programTimes.day_of_week).toDate();
	};
	export const getTime = (program: any) => {
	  if (Array.isArray(program.programTimes)) {
		return moment(program.programTimes[0].start_time).toDate();
	}
	return moment(program.programTimes.start_time).toDate();
  };