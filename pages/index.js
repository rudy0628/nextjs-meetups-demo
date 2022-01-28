import { Fragment } from 'react';

import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = props => {
	return (
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Browse a huge list of highly active React meetups!"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />;
		</Fragment>
	);
};

// // execute every incoming request
// export const getServerSideProps = async context => {
// 	const req = context.req;
// 	const res = context.res;

// 	// fetch data from API

// 	// every code in here runs on server side

// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// };

//only work on page folder components
//call this function before calling components function
export const getStaticProps = async () => {
	// just fetch data here, cause this not run on client
	const client = await MongoClient.connect(
		'mongodb+srv://rudu:B2Q0zzLvhzyqFuv5@cluster0.pjcia.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	//find all meetups
	const meetups = await meetupsCollection.find().toArray();

	client.close();

	// this meetups will setup in component props(Homepage props)
	return {
		props: {
			meetups: meetups.map(meetup => ({
				title: meetup.title,
				image: meetup.image,
				address: meetup.address,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10,
	};
};

export default HomePage;
