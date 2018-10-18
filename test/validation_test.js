const assert = require('assert');
const User = require('../src/user');

describe('Validation records', () => {
  it('requires a user name', () => {
    const user = new User({name: undefined});
    const ValidationResult = user.validateSync();
    // console.log(ValidationResult);
    const {message} = ValidationResult.errors.name;

    assert(message === 'Name is required !!!');
  });

  it('requires a users name longer than 2 characters', (done) => {
    const user = new User({ name:'Al' });
    const ValidationResult = user.validateSync();
    const { message } = ValidationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters.');
    done();
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({name: 'Al'});
    user.save()
        .catch((ValidationResult) => {
          const{ message } = ValidationResult.errors.name;
          assert(message === 'Name must be longer than 2 characters.');
          done();
        });
  });
});
