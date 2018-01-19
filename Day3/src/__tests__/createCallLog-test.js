import createCallLog from '../createCallLog';

it('should return empty call log', () => {
  let callLog = createCallLog();
  expect(callLog.getRecent(10)).toEqual([]);
});

it('should return two call log', () => {
  let callLog = createCallLog();
  callLog.add('MISSED', '9999');
  callLog.add('INCOMING', '0000');
  callLog.add('OUTGOING', '1212');
  let recentList = callLog.getRecent(2);

  let filteredRecentList = recentList.map((call) => {
    let {type, phoneNumber} = call;
    return {type, phoneNumber};
  });

  expect(filteredRecentList).toBeInstanceOf(Array);
  expect(filteredRecentList.length).toEqual(2);
  expect(filteredRecentList).toEqual([
    {
      type: 'OUTGOING',
      phoneNumber: '1212',
    },
    {
      type: 'INCOMING',
      phoneNumber: '0000',
    },
  ]);
});
