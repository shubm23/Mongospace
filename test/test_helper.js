const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;

before((done)=>{
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
  mongoose.connection
    .once('open', () => {
      console.log('connected to mongodb');
      done();
    })
    .on('error', (error) => {
      console.warn('// WARNING: ',error);
    });
});

//Drop the collections before Testing happens
beforeEach((done) => {
  mongoose.connection.collections.users.drop(()=>{
    //Ready to run the next test!
    done();
  });
});
