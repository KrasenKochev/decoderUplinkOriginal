This is a project writen in JavaScript and using Jest for testing, for the purpose to test a function that receives and processes messages.

Received messages are in format of hex strings, then with a helper function, the hex string is converted to a decimal array. Afterwards the array is consumed by the main function and decoded.

In order to test the main function, tests that check the behavior are writen for:

- if a proper payload is send
- if an empty payload is send
- if a payload with invalid charachters is send (chars outside of the range of 0-9 and A-F) is send
- if a payload with odd number of charachters is send
- if malicious payload is send
- if extra long payload is send

Tests are executed by opening the Terminal and typing `npm test`
