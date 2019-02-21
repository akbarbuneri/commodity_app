var default_config = 
                { headers: 
                    { 
                        'DeviceToken': "", // Here you will put the Device Token Provided
                        'UserID': "", // Here you will put the Device UserID 
                        'Password': "" // Password
                    } };
var apiURL  = ""; // This will be provided in the document 

var app = new Vue({
    el:"#apped",
    data :{
        commodities :[],
        selectCommodityQuotes :[],
        commoditiesQuote : [],
        selectedCommodity : {CommodityID:0, NameEn : "Click any Commodity Row"},
        fromDate: "2018-12-01",
        tillDate: "2018-12-31"
    },
    created:function(){
        this.loadData();
        this.loadQuoteData();
    },
    methods: {
            loadData:function(){
                var fa = this;
                axios.get(apiURL + "/API/json/commodities/get-list", default_config)
                .then(function(response){
                    fa.commodities = response.data.Data; 
                })
            },
            loadQuoteData:function(){
                var fa = this;
                axios.get(apiURL +"/API/json/commodities/get-regular-commodity-quotes",default_config)
                .then(function(response){
                    fa.commoditiesQuote = response.data.Data; 
                })
            },
            loadCommodityQoutes:function(id){
                var fa = this;
                fa.selectedCommodity = fa.commodities.filter(function(c){
                    return (c.CommodityID == id);
                })[0];
                axios.get(apiURL +"/API/json/commodities/get-regular-commodity-quotes-archive/"+id+"?start="+ fa.fromDate+"&end="+ fa.tillDate, default_config)
                .then(function(response){
                    fa.selectCommodityQuotes = response.data.Data; 
                });
                return false;
            },
            formatDate: function(d){
                if(d){
                    return (new Date(parseInt(d.replace('/Date(', ''))).toLocaleString());
                }
                return "";

            }
    }

});
