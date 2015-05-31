var fs=require("fs");
var fn=process.argv[4];
var minNum=parseInt(process.argv[2]) || 2;// 切出需要範圍 gram 的最小值
var maxNum=parseInt(process.argv[3]) || 8;// 切出需要範圍 gram 的最大值
var glob=require("glob");
var ngram=2

var bigram={};

var dofile=function(fn){
	bigram={}
	var buf=fs.readFileSync(fn,"utf8");
	for(var i=0; i<=buf.length-ngram; i++){
		var m=buf.substr(i,ngram);
		if(m.match(/[\r\n，。、（）●　《》；？”“]/))continue;
		if (!bigram[m]) bigram[m]=0;
		bigram[m]++;
	}

	var out=sort(bigram);
	var outputfn=fn.replace(".txt","_")+ngram+"gram";
	fs.writeFileSync(outputfn+'.csv',out.map(function(r){return r.join(',')}).join('\n'),"utf8");
	//fs.writeFileSync(outputfn,JSON.stringify(out),"utf8");
	//console.log("number of ",n,"gram",out.length);
	console.log("saved to ",outputfn);
}

var sort=function(obj) {
	var out=[];
	for (var key in obj) {
		out.push([obj[key],key]);
	}
	out.sort(function(a,b){
		return b[0]-a[0];
	})
	return out;
}

glob(fn,function(err,files){
	for(var n=minNum;n<=maxNum;n++) {
	ngram=n;
	files.map(dofile) ;}
})


