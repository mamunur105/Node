const fs = require('fs');

fs.readFile('./test.json' , ( error, data ) => {
	if( error ){
		console.log( error );
	}else{
		const redableData = JSON.parse( data );
		console.log( redableData.address );
	}
});