window.onload = function(){
	let baseCropping = $('#croperimage').croppie({
		viewport: {
			width: 200,
			height: 200,
			type: 'circle'
		},
		boundary: {
			width: 300,
			height: 300
		},
		showZoomer: true
	});

	function readablefile( file ){
		let reader = new FileReader()
		reader.onload = function( event ){
			baseCropping.croppie('bind', {
				url: event.target.result
			}).then( () => {
				$('.cr-slider').attr( {
					'min': 0.5,
					'max':1.5
				} )
			} )
		}
		reader.readAsDataURL( file )
	}
	$('#profilePicsFile').on( 'change', function( e ){
		if( this.files[0]){
			// console.log( this.files[0] ) 
			readablefile( this.files[0] )
			$('#cropmodal').modal( 'show' )
		}
	})
	$('#canselcropping').on('click', function(){
		$('#cropmodal').modal('hide')
	})
	$('#uploadimage').on('click', function(){
		baseCropping.croppie('result', 'blob')
			.then( blob => {
				let formdata = new FormData()
				let file = document.getElementById('profilePicsFile').files[0]
				let name = generatefilename( file.name )
				formdata.append('uploaded_file', blob, name)
				let headers = new Headers()
				headers.append('Accept', 'Application/JSON')
				let req = new Request('/uploads/profilePics', {
					method: 'POST',
					headers,
					mode: 'cors',
					body: formdata
				})
				return fetch( req )
			})
			.then( res => res.json() )
			.then( data => {
				document.getElementById('removeProfilePics').style.display = 'block'
				document.getElementById('profilePics').src = data.profilePics
				document.getElementById('profilepicsForm').reset()
				$('#cropmodal').modal('hide')
				

			})
	});

	$('#removeProfilePics').on('click', function(){
		let req = new Request('/uploads/profilePics', {
			method: 'DELETE',
			mode: 'cors',
		})
		fetch( req )
			.then( res => res.json() )
			.then( data => {
				document.getElementById('removeProfilePics').style.display = 'none'
				document.getElementById('profilePics').src = data.profilePics
				document.getElementById('profilepicsForm').reset()
			})
			.catch( e => {
				console.log( e )
				alert(`Server Error `)
			})
	});


};

function generatefilename( name ){
	const type = /(.jpeg|.jpg|.png|.gif)/
	return name.replace( type, '.png')
}