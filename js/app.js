var default_config = 
                { headers: 
                    { 
                        'DeviceToken': "75B98ACFA6C946108FA03B6ABB38211B", // Here you will put the Device Token Provided
                        'UserID': "U23996-AEF4A894686BC8828EF8-8B518F-0B", // Here you will put the Device UserID 
                        'Password': "yGnu/As3O52zQzbMBX/VMyNS1U8eCR7lL3bh1SfFCoifbPg49rjoNQ==" // Password
                    } };
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
                axios.get("https://ppliveargaamplus.edanat.com/API/json/commodities/get-list", default_config)
                .then(function(response){
                    fa.commodities = response.data.Data; 
                })
            },
            loadQuoteData:function(){
                var fa = this;
                axios.get("https://ppliveargaamplus.edanat.com/API/json/commodities/get-regular-commodity-quotes",default_config)
                .then(function(response){
                    fa.commoditiesQuote = response.data.Data; 
                })
            },
            loadCommodityQoutes:function(id){
                var fa = this;
                fa.selectedCommodity = fa.commodities.filter(function(c){
                    return (c.CommodityID == id);
                })[0];
                axios.get("https://ppliveargaamplus.edanat.com/API/json/commodities/get-regular-commodity-quotes-archive/"+id+"?start="+ fa.fromDate+"&end="+ fa.tillDate, default_config)
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