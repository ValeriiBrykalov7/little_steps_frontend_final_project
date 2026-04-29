import  DiaryListClient  from './DiaryPage.client';

const Home = async () => {
  return (
    <div>
      <h1>Diary</h1>
      <DiaryListClient></DiaryListClient>
    </div>
  );
};

export default Home;
