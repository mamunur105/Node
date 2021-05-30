const fs = require('fs');

const testOb = {
	name: "Md Mamun",
	email: 'testemail@gmail.com',
	address:{
		city: 'Dhaka',
		country: 'BD'
	}
}
const data = JSON.stringify( testOb );
fs.writeFile('./test.json' , data, ( error ) => {
	if( error ){
		console.log( error );
	}else{
		console.log('File Write Sucessful');
	}
});