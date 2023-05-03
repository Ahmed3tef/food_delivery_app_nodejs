import mongoose from 'mongoose';

export const dbConnection = () => {
  const CONNECTION_URL =
    process.env.LOCAL_SERVER ||
    'mongodb://127.0.0.1:27017/online-food-delivery';

  mongoose.connect(CONNECTION_URL).then(conn => {
    console.log(`connected at: ${conn.connection.host}`);
  });
  // .catch(err => console.log('error happened' + err)); don't catch it so we can catch it at unhandledRejections
};

// {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// useCreateIndex: true,
//     }
