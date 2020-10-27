import axios from 'axios';
import tests from './Components/UnitTests';
jest.mock('axios');
 
describe('tests', () => {
  it('if user is admin, gets All Classrooms data correctly', async () => {
    const data = {
      data: {
       
      },
    };
 
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(data === Promise.resolve(data))
    await expect(tests());
    console.log(await tests())

  });
 
  it('if user is not admin, has no access to all classrooms Data', async () => {
    const errorMessage = 'Unauthorized access';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(Error)
  });
});