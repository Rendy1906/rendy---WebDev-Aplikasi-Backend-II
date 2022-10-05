const { databaseQuery } = require('../database');

// GET semua praktikan

const getAll = async () => {
	try {
		const query = `SELECT * FROM rendy_webdev`;
		const result = await databaseQuery(query);

		return {
			count: result.rowCount,
			rows: result.rows,
		};
	} catch (error) {
		return error;
	}
}

// GET seorang praktikan berdasarkan nama

const getUserByName = async (nama) => {
	try {
		const query = `SELECT * FROM rendy_webdev WHERE nama=$1`;
		const result = await databaseQuery(query, [nama]);
		
		return {
			count: result.rowCount,
			rows: result.rows,
		};
	} catch (error) {
		return error;
	}
}

// GET seorang praktikan berdasarkan email dan telepon

const getUserByEmailAndTelephone = async (email,telepon) => {
	try {
		const query = `SELECT * FROM rendy_webdev WHERE email=$1 AND telepon=$2`;
		const result = await databaseQuery(query, [email,telepon]);
		
		return {
			count: result.rowCount,
			rows: result.rows,
		};
	} catch (error) {
		return error;
	}
}


// PATCH seorang praktikan berdasarkan nama

const updateUser = async (deskripsi, nama) => {
	try {
		const query = `UPDATE rendy_webdev SET deskripsi=$1 WHERE nama=$2`;
		const result = await databaseQuery(query, [deskripsi, nama]);
		if (!result) {
            throw new Error('Error Updating User Description');
        }
        if (result.rowCount === 0) {
            throw new Error('User Not Found');
        }
        return {
            message: 'User updated successfully',
        };
    } catch (error) {
        return error
    }

}


// DELETE seorang praktikan berdasarkan email

const deleteUserByEmail = async (email) => {
	try {
		const query = `DELETE FROM rendy_webdev WHERE email=$1`;
		const result = await databaseQuery(query, [email]);

		if (!result) {
			throw new Error('Error deleting User');
		}
		if (result.rowCount === 0){
			throw new Error('USer Not Found');
		}
		return {
			message: 'User deleted successfully',
		};
	} catch (error) {
		return error
	}
}


// CREATE seorang praktikan

const insertNewUser = async ( nama, jenis_kelamin, angkatan, email, telepon, deskripsi ) => {
	try {
		const query = `INSERT INTO rendy_webdev VALUES ($1, $2, $3, $4, $5, $6)`;
		const result = await databaseQuery(query, [ nama, jenis_kelamin, angkatan, email, telepon, deskripsi ]);
		if (!result){
			throw new Error('Error inserting User');
		}
		return {
			message: 'User inserted successfully',
		};
	} catch (error) {
		return error
	}
}

// CREATE lebih dari satu praktikan (Bulk Insert)

const insertBulkUser = async (params) => {
    try {
        let myArrayList = []
        JSON.parse(params,(a,b)=>{myArrayList.push(b)})
        for (let a=0;a<(myArrayList.length-1)/7;a++){
            const query = `insert into rendy_webdev values ('${myArrayList[a*7]}','${myArrayList[(a*7)+1]}','${myArrayList[(a*7)+2]}','${myArrayList[(a*7)+3]}','${myArrayList[(a*7)+4]}','${myArrayList[(a*7)+5]}')`;
            const result = await databaseQuery(query);
            if (!result) {
                throw new Error('Error Inserting Bulk User');
            }
        }
        return {
            message: 'User Inserted successfully',
        };
        
    } catch (error) {
        return error
    }
}


module.exports = {
	getAll,
	getUserByName,
	getUserByEmailAndTelephone,
	insertNewUser,
	insertBulkUser,
	deleteUserByEmail,
	updateUser,
}