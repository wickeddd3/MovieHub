export default {
    methods: {
        formatDateToLongDate(date) {
            if(date) {
                let d = new Date(date);
                var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
                return month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear();
            }
        },
        getDateFullYear(date) {
            if(date) {
                let d = new Date(date);
                return d.getFullYear();
            }
        },
        getMonthYear(date) {
            if(date) {
                let d = new Date(date);
                var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
                return month[d.getMonth()]+" "+d.getFullYear();
            }
        }
    }
}