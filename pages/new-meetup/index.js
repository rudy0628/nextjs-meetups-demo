//our-domain.com/new-meetup
import { Fragment } from 'react';

import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';

const NewMeetUpPage = () => {
	const router = useRouter();

	const addMeetUpHandler = async enteredMeetupData => {
		// in this case, the url is internal url(api)
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredMeetupData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		console.log(data);

		router.push('/');
	};

	return (
		<Fragment>
			<Head>
				<title>Add a New Meetup</title>
				<meta
					name="description"
					content="Add you own meetups and creating amazing networking opportunities"
				/>
			</Head>
			<NewMeetupForm onAddMeetup={addMeetUpHandler} />
		</Fragment>
	);
};

export default NewMeetUpPage;
