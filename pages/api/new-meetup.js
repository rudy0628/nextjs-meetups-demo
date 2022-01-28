import { MongoClient } from 'mongodb';

// /api/new-meetup

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const data = req.body;

		// store in database
		const client = await MongoClient.connect(
			'mongodb+srv://rudu:B2Q0zzLvhzyqFuv5@cluster0.pjcia.mongodb.net/meetups?retryWrites=true&w=majority'
		);
		const db = client.db();

		// create collection(like SQL table)
		const meetupsCollection = db.collection('meetups');

		const result = await meetupsCollection.insertOne(data);

		console.log(result);

		// close mongodb connect
		client.close();

		// return response
		res.status(201).json({ message: 'Add meetup success!' });
	}
};

export default handler;
