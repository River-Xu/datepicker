/*
未完成
怎么把它变成一个模板?
*/

//包裹在一个匿名的自执行函数里面 ,免得里面的变量 污染外面的
(function(){

    //这个是暴露的出口
    var datepicker = {};
    
    
    //initiate datepicker
    datepicker.iniTable = function(){
        initDateTable();
        setLocation();
        showAndHidden();
        goPrev();
        goNext();
        chooseDate();
    };
    
    //set carlender location
    function setLocation(){
        let height = $('.date-input').height();
        let top = $('.date-input-container').offset().top;
        let left = $('.date-input-container').offset().left;
        $('.dateTable').css({
            'top': top+height+24+"px",
            'left':left+"px"
        });
    };
    
    //set show and hidden
    function showAndHidden(){
        $('.iconfont').on('click',function(){
            if($('.dateTable').attr('class') == 'dateTable'){
                $('.dateTable').addClass('tableshow');
            }
            else{
                $('.dateTable').removeClass('tableshow');
            }
        });
    };
    
    //prev btn
    function goPrev(){
        $('.dateTable').on('click','.date-prev-btn',function(){
            let year = getYear();
            let month = getMonth();    
            if(month == 1){
                month = 13;
                year = year - 1;
            }
            let html = getUi(year,month-1);
            updateTbody(html);
            updateTitle(year,month-1);
            
        }); 
    };
    
    //next btn
    function goNext(){
        $('.dateTable').on('click','.date-next-btn',function(){
            let year = parseInt(getYear());
            let month = parseInt(getMonth());    
            if(month == 12){
                month = 0;
                year = year + 1;
            }
            let html = getUi(year,month+1);
            updateTbody(html);
            updateTitle(year,month+1);
        }); 
    };
    
    //choose date
    function chooseDate(){
        $('.dateTable').on('click','.date-tbody td',function(){
            let date = $(this).text();
            let year = getYear();
            let month = getMonth();
            let dates = year + '-' + month + '-' + date;
            $('.date-input').val(dates);
            $('.dateTable').removeClass('tableshow');
        });
    };
    
    //update title
    function updateTitle(year,month){
        $('.dateTitle span').text(year+'-'+month);
    };
    
    //update table body
    function updateTbody(html){
        $('.dateTable').html(html);
    };
    
    //get currentYear
    function getYear(){
        let year = $('.dateTitle span').text().split('-')[0];
        return year;
    };
    
    //get currentMonth
    function getMonth(){
        let month = $('.dateTitle span').text().split('-')[1];
        return month;
    };
    
    //show table
    function initDateTable(){
        let html = getUi(2017,9);   
        $('.dateTable').html(html);
    };
    
    //get table html
    function getUi(year , month){
        let date = new Date();
        let nowYear = date.getFullYear();
        let nowMonth = date.getMonth();
        year==undefined?nowYear:year;
        month==undefined?nowMonth:month;  
        let html = ` <div class="dateTitle-container">
                        <a class="date-prev-btn">&lt</a>
                        <a class="date-next-btn">&gt</a>
                        <div class="dateTitle"><span>2017-9</span></div>
                    </div>
                    <table>
                        <tr class="date-thead">
                            <th class="date-th">日</th>
                            <th class="date-th">一</th>
                            <th class="date-th">二</th>
                            <th class="date-th">三</th>
                            <th class="date-th">四</th>
                            <th class="date-th">五</th>
                            <th class="date-th">六</th>
                        </tr>`; 
        for(let i = 0; i < 6; i++){
            html += '<tr class="date-tbody">';
            for(let j = 0; j < 7; j++){
                html += ` <td>${getDates(year,month,i,j)}</td>`;
            }
            html += '</tr>';
        }  
        html += '</table>'; 
        return html;
    };
    
    //get dates
    function getDates(year,month,i,j){
        let date = 0;
        let oldMonth = new Date(year,month-1,0);
        let oldMonthLastDayWeek = oldMonth.getDay();
        let oldMonthLastDayDate = oldMonth.getDate();
    
        let currentMonth = new Date(year,month-1,1);
        let currentMonthLastDayWeek = currentMonth.getDay();
        let currentMonthFirstDate = currentMonth.getDate();
        let currentMonthLast = new Date(year,month,0);
        let currentMonthLastDate = currentMonthLast.getDate();
    
        if(oldMonthLastDayWeek != 6){ //有上一个月的
            if(i == 0 && j <= oldMonthLastDayWeek){
                date = oldMonthLastDayDate-(oldMonthLastDayWeek-j);
            }
            else if(i == 0 && j > oldMonthLastDayWeek){
                date = currentMonthFirstDate + j - currentMonthLastDayWeek;
            }
            else{
                date = 7*i-oldMonthLastDayWeek+j;
                if(date > currentMonthLastDate)
                {
                    date = date-currentMonthLastDate;
                }
            }
                
        }
        else{ //这个月从一开始的
            date = 7*i+j+1;
            if(date>currentMonthLastDate){
                date = date - currentMonthLastDate;
            }
        }
    
        return date;  
    };

    datepicker.test =  function(){
        console.log('this is my first plugin');
    }

    //暴露出去,外面就可以用datepicker
    window.datepicker = datepicker;

})()




