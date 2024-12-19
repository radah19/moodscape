import HomeCard from '../components/HomeCard';

const HomePage = (user) => {
    return (
        <div>
            <h1>Welcome {user.username}!</h1>
            <HomeCard></HomeCard>
        </div>
    )
}

export default HomePage;