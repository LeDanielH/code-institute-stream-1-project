

$('')
.append()
.append()
.append()
//here
.append();

$('')
.append()
.append()
.append()
//here
.append();

function sampleGulp(){
	this.pipe = function(){
		console.log('Something');
		return this;
	};
	
	this.pipeEndProcess = function(){
		console.log('pipeEndProcess');
		return this;
	};
}

new sampleGulp()
.pipe()
.pipe()
.pipe()
.pipe()
.pipeEndProcess();



var obj = {
	name: 'Daniel',
	info: {
		email: 'example@example.com'
	}
};

console.log(obj.info.email);

var key = 'info',
  key2 = 'email';
console.log(obj[key][key2]);

// obj.info.email
// obj[key][key2]