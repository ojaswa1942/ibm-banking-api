try {
	db.createUser({
	  user: "ibmuser",
	  pwd: "VWY8n3K7L8DvWUhx",
	  roles: [
	    {
	      role: 'readWrite',
	      db: "ibm"
	    }
	  ]
	});
} catch(e) {
	console.log(e);
}
try {
	const check = db.admins.findOne({ username: "ojaswa1942@gmail.com" });
	if(!check) {
		db.admins.insertOne({
			role: "ADMIN",
			username: "ojaswa1942@gmail.com",
			password: "$2b$10$Ha5lE39t/glXBtmyOH0I8OfFOV4TPSmXt6UUcRcQCTZHIicqNCCnK",
			__v: 0,
		});
	}
} catch(e) {
	console.log(e);
}