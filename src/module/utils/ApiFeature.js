export class ApiFeatures{
    constructor(mongooseQuery,queryString){
        this.mongooseQuery=mongooseQuery;
        this.queryString=queryString;    
    }

    // pagination

    pagination(){
        const pageLimit=this.queryString.limit*1 || 10;
        let pageNumber=this.queryString.page*1 || 1;
        if(this.queryString.page<=0) pageNumber=1;
        const skip=(pageNumber-1)*pageLimit;
        this.mongooseQuery=this.mongooseQuery.skip(skip).limit(pageLimit);
        return this;
    }

    // sorting
    sort(){
        if(this.queryString.sort){
            const sorytBy=this.queryString.sort.split(',').join(' ');
           this.mongooseQuery.sort(sorytBy);
            
        }
        return this;

    }

    //filteration

    filteration(){
        let filterObj={...this.queryString};
        let excludeFields=['page','sort','limit','fields','keyword'];

        excludeFields.forEach(el=>delete filterObj[el]);

        filterObj=JSON.stringify(filterObj);
        filterObj=filterObj.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
        filterObj=JSON.parse(filterObj);
        this.mongooseQuery=this.mongooseQuery.find(filterObj);
        return this;
    }

    // search
    search(){
        if(this.queryString.keyword){
        
            this.mongooseQuery.find({
                $or:[
                   { title:{$regex:this.queryString.keyword,$options:'i'}},
                   { description:{$regex:this.queryString.keyword,$options:'i'}}
                ]
            });
        }
        return this;
    }
    // feilds
    fields(){
        if(this.queryString.fields){
            const fields=this.queryString.fields.split(',').join(' ');
            this.mongooseQuery=this.mongooseQuery.select(fields);
        }
        return this;
    }
}