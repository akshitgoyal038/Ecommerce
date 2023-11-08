class apiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        const str=this.queryStr;
        if(str){
            name:{
                $regex:this.queryStr
            }
        }
    }
}


module.exports = apiFeatures;