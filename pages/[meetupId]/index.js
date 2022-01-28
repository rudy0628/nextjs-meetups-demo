import { Fragment } from 'react';

import Head from 'next/head';
import MeetupDetails from '../../components/meetups/MeetupDetails';
import { MongoClient, ObjectId } from 'mongodb';

const MeetupDetailsPage = props => {
	return (
		<Fragment>
			<Head>
				<title>{`Meetup - ${props.meetupData.title}`}</title>
				<meta name="description" content={props.meetupData.description} />
			</Head>
			<MeetupDetails
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</Fragment>
	);
};
export const getStaticPaths = async () => {
	const client = await MongoClient.connect(
		'mongodb+srv://rudu:B2Q0zzLvhzyqFuv5@cluster0.pjcia.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();
	const meetupsCollection = db.collection('meetups');

	// fetch all meetups, but only contains _id key.
	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	client.close();

	return {
		fallback: 'blocking',
		paths: meetups.map(meetup => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
};

// we don't change meetup data multiple request in one second
export const getStaticProps = async context => {
	// context also can get current path params
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(
		'mongodb+srv://rudu:B2Q0zzLvhzyqFuv5@cluster0.pjcia.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();
	const meetupsCollection = db.collection('meetups');

	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});

	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description,
			},
		},
	};
};

export default MeetupDetailsPage;
