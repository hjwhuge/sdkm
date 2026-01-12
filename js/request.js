var request={
	get:function(url,params={}){
		this.requestBase(url,'get',params)
	},
	post:function(url,params={}){
		this.requestBase(url,'post',params)
	},
	put:function(url,params={}){
		this.requestBase(url,'put',params)
	},
	requestBase:function(url,type,params){
		var headers={'Content-Type':'application/json'}
		var token=localStorage.getItem('token')
		if(token){
			headers['authorization']=token
		}
		// console.log(params)
		if(params){
			if(params.data){
				var strP=Object.keys(params.data).map(key=>key+'='+encodeURIComponent(params.data[key])).join()
				if('get'==type){
					params.data=strP
				}else if('put'==type){
					url+='?'+strP
					params.data=''
				}
			}
		}
		var p=Object.assign(params,{
			dataType:'json',
			type:type,
			timeout:1000,
			headers:headers
		})
		mui.ajax(url,p)
	}
}