import React from 'react';
import Card from './components/card'; 

const App = () => {
  const image = "/img/img1.jpg";
  const title = "ButterFly";
  const description = "There is a bunch of butterfly in the forest that are blue in color and are glowing in the dark night.";

  const image2 = "/img/img2.jpeg";
  const title2 = "Mountain";
  const description2 = "There is a person standing on the edge of the lake watching beautiful sunset and view of Mountain.";

  const image3 = "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  const title3 = "Shadow of Moon";
  const description3 = " There is a Shawdow of moon  in the lake in the full moon night .";

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card image={image} title={title} description={description} />
      <Card image={image2} title={title2} description={description2} />
      <Card image={image3} title={title3} description={description3} />

    </div>
  );
};

export default App;
