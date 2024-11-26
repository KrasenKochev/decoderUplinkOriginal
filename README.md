This is a project written in JavaScript and using Jest for testing, for the purpose to test a function that receives and processes messages.

Received messages are in the format of hex strings, then with a helper function, the hex string is converted to a decimal array. Afterwards the array is consumed by the main function and decoded.

In order to test the main function, tests that check the behavior are writen for:

- if a proper payload is sent
- if an empty payload is sent
- if a payload with invalid characters is sent (chars outside of the range of 0-9 and A-F) is sent
- if a payload with an odd number of characters is sent
- if malicious payload is sent
- if extra long payload is sent

Tests are executed by opening the Terminal and typing `npm test`
