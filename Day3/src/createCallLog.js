// @flow

type TimestampFunction = () => string;

type CallType = 'INCOMING' | 'OUTGOING' | 'MISSED';

type Call = {
  type: CallType,
  phoneNumber: string,
  timestamp: string,
};

let defaultTimestampFunction = () => new Date().toISOString();

function createCallLog(
  timestampFunction: TimestampFunction = defaultTimestampFunction,
) {
  let callLog: Array<Call> = [];
  return {
    add: (type: CallType, phoneNumber: string) => {
      callLog.push({
        type,
        phoneNumber,
        timestamp: timestampFunction(),
      });
    },
    getRecent: (amount: number) => {
      // Slice with minus to start from the last element
      return callLog.slice(-amount).reverse();
    },
  };
}

export default createCallLog;
