/* Current Booking Data */
const bookingData = [
    {
        "id": 1,
        "roomId": "A101",
        "startTime": "2022-06-14 13:00:00",
        "endTime": "2022-06-14 14:00:00",
        "title": "Lunch with Petr"
    },
    {
        "id": 2,
        "roomId": "A101",
        "startTime": "2022-06-14 14:00:00",
        "endTime": "2022-06-14 15:00:00",
        "title": "Sales Weekly Meeting"
    },
    {
        "id": 3,
        "roomId": "A101",
        "startTime": "2022-06-14 16:00:00",
        "endTime": "2022-06-14 18:00:00",
        "title": "Anastasia Website Warroom"
    },
    {
        "id": 4,
        "roomId": "A101",
        "startTime": "2022-06-15 13:00:00",
        "endTime": "2022-06-15 14:00:00",
        "title": "One-on-One Session"
    },
    {
        "id": 5,
        "roomId": "A101",
        "startTime": "2022-06-15 16:00:00",
        "endTime": "2022-06-15 18:00:00",
        "title": "UGC Sprint Planning"
    },
    {
        "id": 6,
        "roomId": "A102",
        "startTime": "2022-06-16 09:00:00",
        "endTime": "2022-06-20 18:00:00",
        "title": "5-Day Design Sprint Workshop"
    },
    {
        "id": 7,
        "roomId": "Auditorium",
        "startTime": "2022-06-09 09:00:00",
        "endTime": "2022-06-13 19:00:00",
        "title": "Thai Tech Innovation 2019"
    },
    {
        "id": 8,
        "roomId": "A101",
        "startTime": "2022-06-14 10:00:00",
        "endTime": "2022-06-14 13:00:00",
        "title": "Raimonland project"
    },
    {
        "id": 9,
        "roomId": "A102",
        "startTime": "2022-06-16 18:00:00",
        "endTime": "2022-06-16 20:00:00",
        "title": "Management Meetinng"
    },
    {
        "id": 10,
        "roomId": "A101",
        "startTime": "2022-06-20 14:00:00",
        "endTime": "2022-06-22 11:00:00",
        "title": "3-day workshop Corgi costume"
    }
];

// Parse the URL parameter
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var roomId = getParameterByName('roomId');

$(document).ready(function () {
    //get today date
    const today_date = new Date();

    const day_list = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    const month_list = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    //current booking for today
    //filter the booking  that occur in today
    const currentBookingDataForToday = bookingData.filter((data) => {
        //change format of startTime and set the hours, minutes, second, milliseconds to 0
        let start_date = new Date(new Date(data.startTime)).setHours(0, 0, 0, 0);
        //change format of endTime and set the hours, minutes, second, milliseconds to 0
        let end_date = new Date(new Date(data.endTime)).setHours(0, 0, 0, 0);
        if (data.roomId == roomId) {
            //change format of today and set the hours, minutes, second, milliseconds to 0
            let current_date = new Date(new Date()).setHours(0, 0, 0, 0);
            return end_date >= current_date && start_date <= current_date
        }
    });

    document.getElementById("todayText").innerHTML = day_list[new Date().getDay()];
    document.getElementById("todayDateText").innerHTML = new Date().getDate() + ' ' + month_list[new Date().getMonth()];
    //check current booking for today exists
    if (currentBookingDataForToday.length == 0) {
        //if not exists, show the roomId getting from parameter in the below Id of HTML tag
        document.getElementById("roomId").innerHTML = roomId;
    } else {
        //pass data to corresponding html tag
        document.getElementById("roomId").innerHTML = currentBookingDataForToday[0].roomId;

        //sort booking data as ascending order
        currentBookingDataForToday.sort((a, b) => {
            if (a.startTime < b.startTime) {
                return -1;
            }
            if (a.startTime > b.startTime) {
                return 1;
            }
            return 0;
        });

        //add more html elements and use data from jquery
        var append_for_today_info = '';
        currentBookingDataForToday.forEach((data, i) => {
            append_for_today_info += `<p class=time>${new Date(data.startTime).getHours()} : 
            ${String(new Date(data.startTime).getMinutes()).padStart(2, '0')}
            - ${new Date(data.endTime).getHours()} : 
            ${String(new Date(data.endTime).getMinutes()).padStart(2, '0')} </p>
            <p class=title> ${(data.title)}</p> <br>`
        });
        $('#todayBookingDetails').append(append_for_today_info)
    }

    //current booking for this sunday
    //filter the booking  that occur in this sunday
    const currentBookingDataForThisSunday = bookingData.filter((data) => {
        //change format of startTime and set the hours, minutes, second, milliseconds to 0
        let start_date = new Date(new Date(data.startTime)).setHours(0, 0, 0, 0);
        //change format of endTime and set the hours, minutes, second, milliseconds to 0
        let end_date = new Date(new Date(data.endTime)).setHours(0, 0, 0, 0);
        if (data.roomId == roomId) {
            //change format of Sunday of this week and set the hours, minutes, second, milliseconds to 0
            let this_sunday_date = new Date(today_date.setDate(today_date.getDate() - today_date.getDay())).setHours(0, 0, 0, 0);
            return end_date >= this_sunday_date && start_date <= this_sunday_date
        }
    });

    //check current booking for this Sunday exists
    if (currentBookingDataForThisSunday.length == 0) {
        //if not exist, display none for the below ID of html tag
        document.getElementById("thisSundayBookingList").style.display = 'none';
    } else {
        var booking_date_append_1 = '';
        //get this sunday date
        let this_sunday = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()))
        //add more html elements and use data from jquery
        booking_date_append_1 += `
            <h5>${day_list[this_sunday.getDay()]},
            ${this_sunday.getDate()} ${month_list[this_sunday.getMonth()]}
            </h5>`

        $('#thisSundaybookingDate').append(booking_date_append_1)

        var booking_details_append_1 = '';
        //loop the bookings occur on this Sunday
        currentBookingDataForThisSunday.forEach((data, i) => {
            booking_details_append_1 += `	
            <li class="green">
              <section class="time">${new Date(data.startTime).getHours()} : 
              ${String(new Date(data.startTime).getMinutes()).padStart(2, '0')}
              - ${new Date(data.endTime).getHours()} : 
              ${String(new Date(data.endTime).getMinutes()).padStart(2, '0')}</section>
     
              <p class="description">${data.title}</p>
             </li>
          `
        });
        $('#thisSundaybookingDetails').append(booking_details_append_1)
    }

    //current booking for this monday
    const currentBookingDataForThisMonday = bookingData.filter((data) => {
        let start_date = new Date(new Date(data.startTime)).setHours(0, 0, 0, 0);
        let end_date = new Date(new Date(data.endTime)).setHours(0, 0, 0, 0);
        if (data.roomId == roomId) {
            let this_monday_date = new Date(today_date.setDate(today_date.getDate() - today_date.getDay() + 1)).setHours(0, 0, 0, 0);
            return end_date >= this_monday_date && start_date <= this_monday_date
        }
    });

    if (currentBookingDataForThisMonday.length == 0) {
        document.getElementById("thisMondayBookingList").style.display = 'none';
    } else {
        var booking_date_append_2 = '';

        let this_monday = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1))
        booking_date_append_2 += `
            <h5>${day_list[this_monday.getDay()]},
            ${this_monday.getDate()} ${month_list[this_monday.getMonth()]}
            </h5>`

        $('#thisMondaybookingDate').append(booking_date_append_2)

        var booking_details_append_2 = '';
        currentBookingDataForThisMonday.forEach((data, i) => {
            booking_details_append_2 += `	
            <li class="green">
              <section class="time">${new Date(data.startTime).getHours()} : 
              ${String(new Date(data.startTime).getMinutes()).padStart(2, '0')}
              - ${new Date(data.endTime).getHours()} : 
              ${String(new Date(data.endTime).getMinutes()).padStart(2, '0')}</section>
     
              <p class="description">${data.title}</p>
             </li>
          `
        });
        $('#thisMondaybookingDetails').append(booking_details_append_2)
    }

    //current booking for this tuesday
    const currentBookingDataForThisTuesday = bookingData.filter((data) => {
        let start_date = new Date(new Date(data.startTime)).setHours(0, 0, 0, 0);
        let end_date = new Date(new Date(data.endTime)).setHours(0, 0, 0, 0);
        if (data.roomId == roomId) {
            let this_tuesday_date = new Date(today_date.setDate(today_date.getDate() - today_date.getDay() + 2)).setHours(0, 0, 0, 0);
            return end_date >= this_tuesday_date && start_date <= this_tuesday_date
        }
    });

    if (currentBookingDataForThisTuesday.length == 0) {
        document.getElementById("thisTuesdayBookingList").style.display = 'none';
    } else {
        var booking_date_append_3 = '';

        let this_tuesday = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 2))
        booking_date_append_3 += `
            <h5>${day_list[this_tuesday.getDay()]},
            ${this_tuesday.getDate()} ${month_list[this_tuesday.getMonth()]}
            </h5>`

        $('#thisTuesdaybookingDate').append(booking_date_append_3)

        var booking_details_append_3 = '';
        currentBookingDataForThisTuesday.forEach((data, i) => {
            booking_details_append_3 += `	
            <li class="green">
              <section class="time">${new Date(data.startTime).getHours()} : 
              ${String(new Date(data.startTime).getMinutes()).padStart(2, '0')}
              - ${new Date(data.endTime).getHours()} : 
              ${String(new Date(data.endTime).getMinutes()).padStart(2, '0')}</section>
     
              <p class="description">${data.title}</p>
             </li>
          `
        });
        $('#thisTuesdaybookingDetails').append(booking_details_append_3)
    }

    //current booking for this wednesday
    const currentBookingDataForThisWednesday = bookingData.filter((data) => {
        let start_date = new Date(new Date(data.startTime)).setHours(0, 0, 0, 0);
        let end_date = new Date(new Date(data.endTime)).setHours(0, 0, 0, 0);
        if (data.roomId == roomId) {
            let this_wednesday_date = new Date(today_date.setDate(today_date.getDate() - today_date.getDay() + 3)).setHours(0, 0, 0, 0);
            return end_date >= this_wednesday_date && start_date <= this_wednesday_date
        }
    });

    if (currentBookingDataForThisWednesday.length == 0) {
        document.getElementById("thisWednesdayBookingList").style.display = 'none';
    } else {
        var booking_date_append_4 = '';

        let this_wednesday = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 3))
        booking_date_append_4 += `
            <h5>${day_list[this_wednesday.getDay()]},
            ${this_wednesday.getDate()} ${month_list[this_wednesday.getMonth()]}
            </h5>`

        $('#thisWednesdaybookingDate').append(booking_date_append_4)

        var booking_details_append_4 = '';
        currentBookingDataForThisWednesday.forEach((data, i) => {
            booking_details_append_4 += `	
            <li class="green">
              <section class="time">${new Date(data.startTime).getHours()} : 
              ${String(new Date(data.startTime).getMinutes()).padStart(2, '0')}
              - ${new Date(data.endTime).getHours()} : 
              ${String(new Date(data.endTime).getMinutes()).padStart(2, '0')}</section>
     
              <p class="description">${data.title}</p>
             </li>
          `
        });
        $('#thisWednesdaybookingDetails').append(booking_details_append_4)
    }

    //current booking for this thursday
    const currentBookingDataForThisThursday = bookingData.filter((data) => {
        let start_date = new Date(new Date(data.startTime)).setHours(0, 0, 0, 0);
        let end_date = new Date(new Date(data.endTime)).setHours(0, 0, 0, 0);
        if (data.roomId == roomId) {
            let this_thursday_date = new Date(today_date.setDate(today_date.getDate() - today_date.getDay() + 4)).setHours(0, 0, 0, 0);
            return end_date >= this_thursday_date && start_date <= this_thursday_date
        }
    });

    if (currentBookingDataForThisThursday.length == 0) {
        document.getElementById("thisThursdayBookingList").style.display = 'none';
    } else {
        var booking_date_append_5 = '';

        let this_thursday = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 4))
        booking_date_append_5 += `
            <h5>${day_list[this_thursday.getDay()]},
            ${this_thursday.getDate()} ${month_list[this_thursday.getMonth()]}
            </h5>`

        $('#thisThursdaybookingDate').append(booking_date_append_5)

        var booking_details_append_5 = '';
        currentBookingDataForThisThursday.forEach((data, i) => {
            booking_details_append_5 += `	
            <li class="green">
              <section class="time">${new Date(data.startTime).getHours()} : 
              ${String(new Date(data.startTime).getMinutes()).padStart(2, '0')}
              - ${new Date(data.endTime).getHours()} : 
              ${String(new Date(data.endTime).getMinutes()).padStart(2, '0')}</section>
     
              <p class="description">${data.title}</p>
             </li>
          `
        });
        $('#thisThursdaybookingDetails').append(booking_details_append_5)
    }

    //current booking for this friday
    const currentBookingDataForThisFriday = bookingData.filter((data) => {
        let start_date = new Date(new Date(data.startTime)).setHours(0, 0, 0, 0);
        let end_date = new Date(new Date(data.endTime)).setHours(0, 0, 0, 0);
        if (data.roomId == roomId) {
            let this_friday_date = new Date(today_date.setDate(today_date.getDate() - today_date.getDay() + 5)).setHours(0, 0, 0, 0);
            return end_date >= this_friday_date && start_date <= this_friday_date
        }
    });

    if (currentBookingDataForThisFriday.length == 0) {
        document.getElementById("thisFridayBookingList").style.display = 'none';
    } else {
        var booking_date_append_6 = '';

        let this_friday = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 5))
        booking_date_append_6 += `
            <h5>${day_list[this_friday.getDay()]},
            ${this_friday.getDate()} ${month_list[this_friday.getMonth()]}
            </h5>
        `
        $('#thisFridaybookingDate').append(booking_date_append_6)

        var booking_details_append_6 = '';
        currentBookingDataForThisFriday.forEach((data, i) => {
            booking_details_append_6 += `	
            <li class="green">
              <section class="time">${new Date(data.startTime).getHours()} : 
              ${String(new Date(data.startTime).getMinutes()).padStart(2, '0')}
              - ${new Date(data.endTime).getHours()} : 
              ${String(new Date(data.endTime).getMinutes()).padStart(2, '0')}</section>
     
              <p class="description">${data.title}</p>
             </li>
          `
        });
        $('#thisFridaybookingDetails').append(booking_details_append_6)
    }

    //current booking for this saturday
    const currentBookingDataForThisSaturday = bookingData.filter((data) => {
        let start_date = new Date(new Date(data.startTime)).setHours(0, 0, 0, 0);
        let end_date = new Date(new Date(data.endTime)).setHours(0, 0, 0, 0);
        if (data.roomId == roomId) {
            let this_friday_date = new Date(today_date.setDate(today_date.getDate() - today_date.getDay() + 6)).setHours(0, 0, 0, 0);
            return end_date >= this_friday_date && start_date <= this_friday_date
        }
    });

    if (currentBookingDataForThisSaturday.length == 0) {
        document.getElementById("thisSaturdayBookingList").style.display = 'none';
    } else {
        var booking_date_append_7 = '';

        let this_saturday = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 6))
        booking_date_append_7 += `
            <h5>${day_list[this_saturday.getDay()]},
            ${this_saturday.getDate()} ${month_list[this_saturday.getMonth()]}
            </h5>`

        $('#thisSaturdaybookingDate').append(booking_date_append_7)

        var booking_details_append_7 = '';
        currentBookingDataForThisSaturday.forEach((data, i) => {
            booking_details_append_7 += `	
            <li class="green">
              <section class="time">${new Date(data.startTime).getHours()} : 
              ${String(new Date(data.startTime).getMinutes()).padStart(2, '0')}
              - ${new Date(data.endTime).getHours()} : 
              ${String(new Date(data.endTime).getMinutes()).padStart(2, '0')}</section>
     
              <p class="description">${data.title}</p>
             </li>
          `
        });
        $('#thisSaturdaybookingDetails').append(booking_details_append_7)
    }
})
